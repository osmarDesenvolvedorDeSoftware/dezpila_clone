import axios from 'axios';

export default async function handler(req: any, res: any) {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "TMDB_API_KEY not configured" });
        }

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

        res.status(200).json(responsePayload);
    } catch (error: any) {
        console.error("TMDB Error:", error.message);
        res.status(500).json({ error: "Failed to fetch data from TMDB: " + error.message });
    }
}
