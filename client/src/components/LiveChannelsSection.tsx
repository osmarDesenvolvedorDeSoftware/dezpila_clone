// Live Channels Section Component - 10Pila TV Clone
// Design: Grid of channel logos
// Features: 3x3 grid, responsive layout

import { useEffect, useState } from "react";
import { channels, Channel } from "@/lib/content";

export default function LiveChannelsSection() {
  const [displayedChannels, setDisplayedChannels] = useState<Channel[]>([]);

  useEffect(() => {
    // Shuffle channels array and take 9 random ones
    const shuffled = [...channels].sort(() => 0.5 - Math.random());
    setDisplayedChannels(shuffled.slice(0, 9));
  }, []);

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
          {displayedChannels.map((channel) => (
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
          <a
            href="https://wa.me/5516997555381?text=Olá,%20quero%20ter%20acesso%20a%20todos%20esses%20canais%20ao%20vivo%20na%2010Pila%20TV!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta decoration-0 text-center"
          >
            Assinar Agora
          </a>
        </div>
      </div>
    </section>
  );
}
