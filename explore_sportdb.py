import urllib.request
import json
import ssl

# Allow unverified SSL just in case (development env)
ssl._create_default_https_context = ssl._create_unverified_context

API_KEY = "d6L5PTotWzApBrXJlAq3hdgRNKgRMMGCrXUqHERO"
BASE_URL = "https://api.sportdb.dev/api/flashscore"

def fetch(endpoint):
    url = f"{BASE_URL}/{endpoint}"
    req = urllib.request.Request(url)
    req.add_header("X-API-Key", API_KEY)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read()
            return json.loads(data)
    except Exception as e:
        print(f"Error fetching {endpoint}: {e}")
        return None

def print_header(title):
    print(f"\n{'='*50}\n{title}\n{'='*50}")

def explore():
    # 1. List Football Regions to find IDs
    print_header("1. Searching for Region IDs (Brazil, S.America, World)")
    football_data = fetch("football")
    
    regions = {"brazil": None, "south-america": None, "world": None}
    
    if football_data:
        for item in football_data:
            slug = item.get("slug", "")
            if slug == "brazil":
                regions["brazil"] = f"{slug}:{item['id']}"
            elif slug == "south-america":
                regions["south-america"] = f"{slug}:{item['id']}"
            elif slug == "world":
                regions["world"] = f"{slug}:{item['id']}"
    
    print("Found Regions:", json.dumps(regions, indent=2))

    # 2. List Leagues for each region
    target_leagues = [] # Store some tuples (region_name, league_id, league_name)

    keywords_to_find = [
        "Copa", "Friendly", "Amistoso"
    ]
    
    found_tournaments = []

    for region_name, region_id in regions.items():
        if not region_id: continue
        
        print_header(f"2. Analyzing Leagues in {region_name} ({region_id})")
        leagues = fetch(f"football/{region_id}")
        
        if leagues:
            print(f"Total leagues found: {len(leagues)}")
            
            for l in leagues:
                name = l['name']
                # Search for specific terms we are missing
                if region_name == "brazil" and "Copa" in name:
                     print(f"  [BRAZIL MATCH] {name} (ID: {l['id']})")
                
                if region_name == "world" and ("Friendly" in name or "Amistoso" in name):
                     print(f"  [WORLD MATCH] {name} (ID: {l['id']})")



    # 3. Check Live/Scheduled Games for selected leagues
    print_header("3. Checking Games & TV Channels")
    
    if not target_leagues:
        print("No target leagues found automatically. Trying manual fallback for Brazil Serie A...")
        # Fallback to the user provided example if discovery failed
        target_leagues.append(("brazil:39", "serie-a-betano:Yq4hUnzQ", "Serie A Betano"))

    for region_id, league_full_id, league_name in target_leagues:
        print(f"\nChecking -> {league_name} ({league_full_id})...")
        
        # Try 'live' first, if empty, maybe try 'fixtures' if the API supports it in the same way or just report no live games
        # The user guide says ".../live" gets games (live or scheduled for the season? "Jogos do dia (OU ao vivo)")
        # Let's try /live endpoint as requested
        
        games = fetch(f"football/{region_id}/{league_full_id}/live")
        
        if not games:
            print("  > No games returned from /live endpoint.")
            continue
            
        print(f"  > Found {len(games)} games.")
        
        if games:
            # print(f"DEBUG: First game JSON structure:\n{json.dumps(games[0], indent=2)}") # Comment out debug
            pass

        for g in games: # Show details for all games found
            start_time = g.get("startDateTimeUtc", "Unknown Time")
            home = g.get("homeName", "Unknown")
            away = g.get("awayName", "Unknown")
            
            print(f"  GAME: {home} vs {away}")
            print(f"    Time (UTC): {start_time}")
            
            # TV Channels
            tv_raw = g.get("hasTvOrLivestreaming")
            channels_found = []
            
            if tv_raw:
                try:
                    # It's often a stringified JSON
                    if isinstance(tv_raw, str):
                        tv_data = json.loads(tv_raw)
                    else:
                        tv_data = tv_raw
                        
                    if isinstance(tv_data, dict):
                        for key, sources in tv_data.items():
                            for source in sources:
                                name = source.get('BN')
                                if name:
                                    channels_found.append(name)
                except Exception as e:
                    print(f"    Error parsing TV data: {e}")

            if channels_found:
                print("    TV Channels:")
                # Deduplicate and sort
                for ch in sorted(list(set(channels_found))):
                     print(f"      - {ch}")
            else:
                print("    TV Channels: None listed.")

if __name__ == "__main__":
    import sys
    
    # Redirect stdout to a file
    with open("api_results_utf8.txt", "w", encoding="utf-8") as f:
        original_stdout = sys.stdout
        sys.stdout = f
        try:
            explore()
        finally:
            sys.stdout = original_stdout
    
    # Also print to console for sanity
    print("Exploration finished. Check api_results_utf8.txt")
