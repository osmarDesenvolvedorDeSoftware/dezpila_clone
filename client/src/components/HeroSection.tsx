// Hero Section Component - 10Pila TV Clone
// Design: Bold red background with devices mockup
// Features: Main headline, subheadline, CTA button

import heroBackgroundUrl from "@/assets/hero-background.png";
import heroDevicesUrl from "@/assets/hero-devices.png";

export default function HeroSection() {

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center pt-20 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${heroBackgroundUrl}')`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay - Darker for better text contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 pt-12">
        {/* Left Content Wrapper - Restored */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up flex flex-col items-center lg:items-start">
          <h1 className="text-white mb-6 leading-[1.1] text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter">
            Toda a TV a Cabo liberada por <span className="text-red-600 block">4 HORAS GRÁTIS</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 font-medium max-w-xl">
            Experimente a melhor IPTV do Brasil sem compromisso. Filmes, séries e todos os canais de esporte em HD.
          </p>
          <a href="https://wa.me/5516997555381?text=Olá,%20acabei%20de%20ver%20o%20site%20da%2010Pila%20TV%20e%20quero%20um%20teste%20grátis!" className="bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl font-black px-12 py-5 rounded-full uppercase tracking-tighter shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 decoration-0">
            <span className="text-2xl animate-bounce-slow">🚀</span>
            QUERO MEU TESTE GRÁTIS
          </a>
        </div>

        {/* Right Image - New High Quality Mockup */}
        <div className="flex-1 hidden lg:flex justify-end animate-slide-in-right">
          <div className="relative">
            <div className="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full"></div>
            <img
              src={heroDevicesUrl}
              alt="10Pila TV em múltiplos dispositivos"
              className="relative max-w-2xl w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </div>
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
