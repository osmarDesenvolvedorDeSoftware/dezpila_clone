import axios from 'axios';

// In-memory cache - persists only while the serverless function instance is warm
const sportsCache = {
    data: null as any,
    timestamp: 0,
    currentTTL: 15 * 60 * 1000 // Start with default 15 min
};

export default async function handler(req: any, res: any) {
    try {
        const now = Date.now();
        // Check Cache with Dynamic TTL
        if (sportsCache.data && (now - sportsCache.timestamp < sportsCache.currentTTL)) {
            const remaining = Math.round((sportsCache.currentTTL - (now - sportsCache.timestamp)) / 1000 / 60);
            console.log(`[SportDB] Serving from cache (TTL: ${remaining}m remaining)`);
            return res.status(200).json(sportsCache.data);
        }

        console.log("[SportDB] Cache expired or first run. Fetching fresh data...");

        // Use env var or fallback
        const apiKey = process.env.SPORTDB_API_KEY || "d6L5PTotWzApBrXJlAq3hdgRNKgRMMGCrXUqHERO";
        const baseUrl = "https://api.sportdb.dev/api/flashscore";

        // Target Leagues Configuration
        const leagues = [
            { region: "brazil:39", id: "serie-a-betano:Yq4hUnzQ", name: "Brasileirão Série A" },
            { region: "brazil:39", id: "copa-betano-do-brasil:zFsJPnr6", name: "Copa do Brasil" },
            { region: "south-america:3", id: "copa-libertadores:zmKRcPKu", name: "Libertadores" },
            { region: "south-america:3", id: "copa-sudamericana:EwJVdqzn", name: "Sul-Americana" },
            { region: "brazil:39", id: "paulista:CCW826Dg", name: "Paulistão" },
            { region: "brazil:39", id: "carioca:IHuPOQcm", name: "Cariocão" },
            { region: "world:8", id: "friendly-international:f1GbGBCd", name: "Amistosos" }
        ];

        const allGames: any[] = [];

        // Helper to fetch league data
        const fetchLeagueGames = async (league: any) => {
            try {
                const url = `${baseUrl}/football/${league.region}/${league.id}/live`;
                const response = await axios.get(url, {
                    headers: { "X-API-Key": apiKey },
                    timeout: 5000
                });

                if (!response.data || !Array.isArray(response.data)) return [];

                return response.data.map((g: any) => {
                    // Parse TV Channels
                    let channels: string[] = [];
                    const tvRaw = g.hasTvOrLivestreaming;
                    if (tvRaw) {
                        try {
                            const tvData = typeof tvRaw === 'string' ? JSON.parse(tvRaw) : tvRaw;
                            if (tvData && typeof tvData === 'object') {
                                Object.values(tvData).forEach((sources: any) => {
                                    if (Array.isArray(sources)) {
                                        sources.forEach((s: any) => {
                                            if (s.BN) channels.push(s.BN);
                                        });
                                    }
                                });
                            }
                        } catch (e) {
                            console.error("Error parsing channels", e);
                        }
                    }

                    // Deduplicate channels
                    channels = [...new Set(channels)];

                    const stage = g.eventStageName;
                    let status: "scheduled" | "live" | "finished" = "scheduled";

                    if (["Live", "At halftime", "Kick-off", "Waiting for extra time", "Extra time halftime", "Waiting for penalties"].includes(stage)) {
                        status = "live";
                    } else if (stage === "Finished" || stage === "After extra time" || stage === "After penalties") {
                        status = "finished";
                    } else {
                        status = "scheduled";
                    }

                    return {
                        id: g.eventId,
                        league: league.name,
                        home: g.homeName || g.homeParticipantName || "Time A",
                        away: g.awayName || g.awayParticipantName || "Time B",
                        homeLogo: g.homeLogo,
                        awayLogo: g.awayLogo,
                        time: g.startDateTimeUtc, // UTC ISO String
                        score: (status === "live" || status === "finished") ? `${g.homeScore}-${g.awayScore}` : null,
                        status,
                        channels: channels.filter(c => c.includes("(Bra)") || c.includes("ESPN") || c.includes("Fox") || c.includes("Premiere") || c.includes("SportTV") || c.includes("Globo")).slice(0, 3) // Filter for Relevance
                    };
                });
            } catch (error: any) {
                console.error(`Failed to fetch ${league.name}:`, error.message);
                return [];
            }
        };

        // Fetch all in parallel
        const results = await Promise.all(leagues.map(l => fetchLeagueGames(l)));

        // Flatten results
        results.forEach(games => allGames.push(...games));

        // Sort by time
        allGames.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        // CALCULATE SMART TTL
        const hasLiveGames = allGames.some(g => g.status === "live");
        const nextGame = allGames.find(g => g.status === "scheduled");

        let dynamicTTL = 15 * 60 * 1000; // Default 15 mins

        if (hasLiveGames) {
            dynamicTTL = 5 * 60 * 1000; // Live match? Check every 5 mins for scores
            console.log("[SportDB] Matches ARE LIVE. Setting TTL to 5 mins.");
        } else if (nextGame) {
            const gameTime = new Date(nextGame.time).getTime();
            const timeToGame = gameTime - Date.now();

            if (timeToGame > 0) {
                // Cache until the game starts, but max 4 hours
                dynamicTTL = Math.min(timeToGame, 4 * 60 * 60 * 1000);
                console.log(`[SportDB] No live matches. Next game in ${Math.round(timeToGame / 1000 / 60)}m. Setting TTL accordingly.`);
            }
        } else {
            // No more games today? Cache for 6 hours
            dynamicTTL = 6 * 60 * 60 * 1000;
            console.log("[SportDB] No more games scheduled. Setting long TTL (6h).");
        }

        // Update Cache
        sportsCache.data = allGames;
        sportsCache.timestamp = Date.now();
        sportsCache.currentTTL = dynamicTTL;

        res.status(200).json(allGames);

    } catch (error: any) {
        console.error("SportDB Proxy Error:", error.message);
        res.status(500).json({ error: "Failed to fetch sports data" });
    }
}
