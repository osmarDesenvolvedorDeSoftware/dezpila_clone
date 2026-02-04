// Catalog Section Component - 10Pila TV Clone
// Design: Featured content with carousel
// Features: Section divider, carousel, description

import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { featuredContent } from "@/lib/content";
import axios from "axios";

// Interface matching the backend response
interface TmdbMovie {
  id: number;
  title: string;
  poster_url: string;
  rating: number;
}

export default function CatalogSection() {
  const [movies, setMovies] = useState<any[]>([]); // Start empty to avoid FOUC
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/tmdb/featured");
        if (response.data && Array.isArray(response.data)) {
          // Map backend data to Carousel format
          const mappedMovies = response.data.map((m: TmdbMovie) => ({
            id: String(m.id),
            title: m.title,
            image: m.poster_url || "https://placehold.co/200x300?text=Sem+Imagem", // Fallback image
            category: "FILME", // Static category for now
            rating: m.rating.toFixed(1),
          }));
          setMovies(mappedMovies);
        }
      } catch (error) {
        console.error("Failed to fetch featured movies:", error);
        // Keep showing static content on error
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section id="catalogo" className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header with Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 h-px bg-red-600"></div>
          <span className="text-red-600 text-2xl font-bold">●</span>
          <span className="text-white text-lg md:text-xl font-bold">
            CATÁLOGO
          </span>
          <span className="text-red-600 text-2xl font-bold">●</span>
          <div className="flex-1 h-px bg-red-600"></div>
        </div>

        {/* Title */}
        <h2 className="text-white text-4xl md:text-5xl font-black text-center mb-4">
          Produções em <span className="text-red-600">Destaque</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-center text-lg mb-12 max-w-2xl mx-auto">
          Aproveite lançamentos dos cinemas e o melhor dos streamings.
        </p>

        {/* Carousel or Skeleton */}
        {loading ? (
          <div className="w-full">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 opacity-0">
              Loading
            </h2>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex-shrink-0 w-48">
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
                    <div className="h-72 bg-gray-700/50"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-gray-700/50 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-700/50 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Carousel items={movies} title="" />
        )}
      </div>
    </section>
  );
}
