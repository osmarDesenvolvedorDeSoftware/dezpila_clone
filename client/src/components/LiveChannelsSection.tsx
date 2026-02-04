// Live Channels Section Component - Dezpila TV Clone
// Design: Grid of channel logos
// Features: 3x3 grid, responsive layout

import { channels } from "@/lib/content";

export default function LiveChannelsSection() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header with Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 h-px bg-red-600"></div>
          <span className="text-red-600 text-2xl font-bold">●</span>
          <span className="text-white text-lg md:text-xl font-bold">
            AO VIVO
          </span>
          <span className="text-red-600 text-2xl font-bold">●</span>
          <div className="flex-1 h-px bg-red-600"></div>
        </div>

        {/* Title */}
        <h2 className="text-white text-4xl md:text-5xl font-black text-center mb-4">
          Não perca o melhor do <span className="text-red-600">Ao Vivo</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-center text-lg mb-12 max-w-2xl mx-auto">
          Notícias, esportes, documentários e muito mais já incluso na plataforma.
        </p>

        {/* Channels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-white rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <img
                src={channel.logo}
                alt={channel.name}
                className="max-h-16 max-w-full object-contain group-hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a href="#planos" className="btn-cta">
            Assinar Agora
          </a>
        </div>
      </div>
    </section>
  );
}
