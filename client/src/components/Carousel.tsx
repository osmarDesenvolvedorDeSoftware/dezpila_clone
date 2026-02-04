// Carousel Component - 10Pila TV Clone
// Design: Horizontal scroll with movie cards
// Features: Navigation arrows, smooth scrolling, responsive

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Movie } from "@/lib/content";

interface CarouselProps {
  items: Movie[];
  title: string;
}

export default function Carousel({ items, title }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">{title}</h2>

      <div className="relative group">
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          onScroll={checkScroll}
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 group/card cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Movie Card */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="relative h-72 overflow-hidden bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href="https://wa.me/5516997555381?text=Olá,%20vi%20um%20conteúdo%20no%20catálogo%20da%2010Pila%20TV%20e%20quero%20assinar!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta text-sm py-2 px-4 decoration-0"
                    >
                      Assine
                    </a>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-2 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 text-xs font-semibold">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-white text-xs font-semibold">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
