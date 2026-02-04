// Catalog Section Component - Dezpila TV Clone
// Design: Featured content with carousel
// Features: Section divider, carousel, description

import Carousel from "./Carousel";
import { featuredContent } from "@/lib/content";

export default function CatalogSection() {
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

        {/* Carousel */}
        <Carousel items={featuredContent} title="" />
      </div>
    </section>
  );
}
