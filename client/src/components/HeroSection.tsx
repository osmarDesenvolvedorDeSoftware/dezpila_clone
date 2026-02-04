// Hero Section Component - Dezpila TV Clone
// Design: Bold red background with devices mockup
// Features: Main headline, subheadline, CTA button

import heroBackgroundUrl from "@/assets/hero-background.png";
import devicesImageUrl from "@/assets/devices-mockup.png";

export default function HeroSection() {

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center pt-20 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${heroBackgroundUrl}')`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          <h1 className="text-white mb-4">
            Você só precisa de <span className="text-red-600">DEZ</span>
            <span className="text-red-600">PILA</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-light">
            Filmes, séries e canais ao vivo, tudo em um só lugar.
          </p>
          <a href="#planos" className="btn-cta inline-block">
            Assinar Agora
          </a>
        </div>

        {/* Right Image */}
        <div className="flex-1 hidden lg:flex justify-center animate-slide-in-right">
          <img
            src={devicesImageUrl}
            alt="Dezpila em múltiplos dispositivos"
            className="max-w-md object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-red-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
