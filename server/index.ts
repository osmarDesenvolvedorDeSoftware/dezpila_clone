import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // TMDB API Proxy
  app.get("/api/tmdb/search", async (req, res) => {
    try {
      const query = req.query.query as string;
      if (!query) {
        return res
          .status(400)
          .json({ error: "Query parameter is required" });
      }

      const apiKey = process.env.TMDB_API_KEY;
      if (!apiKey) {
        return res
          .status(500)
          .json({ error: "TMDB_API_KEY not configured in .env" });
      }

      console.log(`[TMDB] Searching for: ${query}`);

      // 1. Search for the movie
      const searchUrl = "https://api.themoviedb.org/3/search/movie";
      const searchRes = await axios.get(searchUrl, {
        params: {
          api_key: apiKey,
          query: query,
          language: "pt-BR",
        },
      });

      const results = searchRes.data.results;
      if (!results || results.length === 0) {
        return res.status(404).json({ error: "Filme não encontrado no TMDB" });
      }

      // Get the first result
      const movie = results[0];
      const movieId = movie.id;

      // 2. Fetch details (runtime, genres, etc.)
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
      const detailsRes = await axios.get(detailsUrl, {
        params: { api_key: apiKey, language: "pt-BR" },
      });
      const details = detailsRes.data;

      // 3. Fetch credits (director, cast)
      const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const creditsRes = await axios.get(creditsUrl, {
        params: { api_key: apiKey, language: "pt-BR" },
      });
      const credits = creditsRes.data;

      // 4. Fetch videos (trailer)
      const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos`;
      const videosRes = await axios.get(videosUrl, {
        params: { api_key: apiKey, language: "pt-BR" },
      });
      const videos = videosRes.data;

      // Process Data
      const director =
        credits.crew?.find((c: any) => c.job === "Director")?.name ||
        "Diretor desconhecido";
      const cast = credits.cast
        ?.slice(0, 5)
        .map((c: any) => c.name);

      const trailer =
        videos.results?.find(
          (v: any) => v.site === "YouTube" && v.type === "Trailer"
        ) || videos.results?.[0];

      const responsePayload = {
        tmdb_id: movieId,
        title: movie.title || movie.name,
        original_title: movie.original_title,
        overview: movie.overview || "Sinopse indisponível",
        release_date: movie.release_date,
        rating: movie.vote_average,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        backdrop_url: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : null,
        runtime: details.runtime,
        genres: details.genres?.map((g: any) => g.name) || [],
        director,
        cast,
        trailer_url: trailer
          ? `https://www.youtube.com/watch?v=${trailer.key}`
          : null,
      };

      res.json(responsePayload);
    } catch (error: any) {
      console.error("TMDB Error:", error.message);
      res.status(500).json({ error: "Failed to fetch data from TMDB: " + error.message });
    }
  });

  // TMDB Featured/Dynamic Movies Endpoint
  app.get("/api/tmdb/featured", async (req, res) => {
    try {
      const apiKey = process.env.TMDB_API_KEY;
      if (!apiKey) {
        return res
          .status(500)
          .json({ error: "TMDB_API_KEY not configured in .env" });
      }

      // Randomize page to make it dynamic (1 to 5)
      const randomPage = Math.floor(Math.random() * 5) + 1;

      // Discover 2026 movies (or current/upcoming)
      const discoverUrl = "https://api.themoviedb.org/3/discover/movie";
      const discoverRes = await axios.get(discoverUrl, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          sort_by: "popularity.desc",
          primary_release_year: 2026,
          page: randomPage,
          include_adult: false,
        },
      });

      const results = discoverRes.data.results;

      // Map to simple format
      const movies = results.map((m: any) => ({
        id: m.id,
        title: m.title || m.name,
        poster_url: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : null,
        rating: m.vote_average,
      }));

      // Shuffle the array to allow more variety on frontend
      const shuffled = movies.sort(() => 0.5 - Math.random());

      res.json(shuffled.slice(0, 10)); // Return top 10 random ones from that page
    } catch (error: any) {
      console.error("TMDB Featured Error:", error.message);
      // Fallback: don't crash, just return empty array or error
      res.status(500).json({ error: "Failed to fetch featured movies" });
    }
  });
  // SportDB / Flashscore Proxy
  const sportsCache = {
    data: null as any,
    timestamp: 0,
    currentTTL: 15 * 60 * 1000 // Start with default 15 min
  };

  app.get("/api/sports/schedule", async (req, res) => {
    try {
      const now = Date.now();
      // Check Cache with Dynamic TTL
      if (sportsCache.data && (now - sportsCache.timestamp < sportsCache.currentTTL)) {
        const remaining = Math.round((sportsCache.currentTTL - (now - sportsCache.timestamp)) / 1000 / 60);
        console.log(`[SportDB] Serving from cache (TTL: ${remaining}m remaining)`);
        return res.json(sportsCache.data);
      }

      console.log("[SportDB] Cache expired or first run. Fetching fresh data...");

      // Use env var or fallback to the key provided in chat
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

      const allGames = [];

      // Helper to fetch league data
      const fetchLeagueGames = async (league: any) => {
        try {
          const url = `${baseUrl}/football/${league.region}/${league.id}/live`;
          const response = await axios.get(url, {
            headers: { "X-API-Key": apiKey },
            // Short timeout to prevent slow loading
            timeout: 5000
          });

          if (!response.data || !Array.isArray(response.data)) return [];

          return response.data.map((g: any) => {
            // Parse TV Channels
            let channels = [];
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
        } catch (error) {
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

      res.json(allGames);

    } catch (error: any) {
      console.error("SportDB Proxy Error:", error.message);
      res.status(500).json({ error: "Failed to fetch sports data" });
    }
  });

  // Serve static files
  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes (Catch-all)
  // IMPORTANT: This must be after API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
