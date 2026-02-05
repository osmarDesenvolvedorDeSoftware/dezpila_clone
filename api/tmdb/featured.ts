import axios from 'axios';

export default async function handler(req: any, res: any) {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "TMDB_API_KEY not configured" });
        }

        // Randomize page to make it dynamic (1 to 5)
        // Note: In serverless, this randomness happens per request, which is fine.
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

        res.status(200).json(shuffled.slice(0, 10)); // Return top 10 random ones from that page
    } catch (error: any) {
        console.error("TMDB Featured Error:", error.message);
        res.status(500).json({ error: "Failed to fetch featured movies" });
    }
}
