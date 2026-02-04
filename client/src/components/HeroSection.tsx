// Hero Section Component - Dezpila TV Clone
// Design: Bold red background with devices mockup
// Features: Main headline, subheadline, CTA button

export default function HeroSection() {
  const heroBackgroundUrl =
    "https://private-us-east-1.manuscdn.com/sessionFile/h1Zz8OIhArqeSK042Hq1IQ/sandbox/E4WcnGybojQJ0pLqnOScuh-img-1_1770207816000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaDFaejhPSWhBcnFlU0swNDJIcTFJUS9zYW5kYm94L0U0V2NuR3lib2pRSjBwTHFuT1NjdWgtaW1nLTFfMTc3MDIwNzgxNjAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=iNdZKx9w5YoCQc6i~F4Pdg2eICpUbZIBsYfHmpWiVt6lZLGiuaoTYSJz6p8cLrZ6aKOOkPQyderHpvS580vusb-mXerouKHK0moovhtYKuXX5QW4IDB56gBOBpL0NSYqhYJlms5HFeNmXqSQ7zzzsPpj4MG19x~O~5dkQVnPLfJ2ubtYTRolX8aWm8XASNMdroMghw2-JKZy9aLkc~XTzCK1SXQgaZUNN907n~5bDHuiGd7hZAmebnVm61dU60PUeuCWw9fkIOQ-lYjIM~~of9560hZYA-jG-uiVZKs2eVRtTnixQumd0EEzBhvCsm-cFBiFXSdXCzxVLjf7uG6SyA__";

  const devicesImageUrl =
    "https://private-us-east-1.manuscdn.com/sessionFile/h1Zz8OIhArqeSK042Hq1IQ/sandbox/E4WcnGybojQJ0pLqnOScuh-img-2_1770207809000_na1fn_ZGV2aWNlcy1tb2NrdXA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaDFaejhPSWhBcnFlU0swNDJIcTFJUS9zYW5kYm94L0U0V2NuR3lib2pRSjBwTHFuT1NjdWgtaW1nLTJfMTc3MDIwNzgwOTAwMF9uYTFmbl9aR1YyYVdObGN5MXRiMjNyZFhBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nLdXde1JV4~hH3WZbAyQ1obN-rb~3H1HdtGKrAKH8qMPUvcqbOX5tdIRD~KxRQ4uLR0RmCNjGkWDaeVt~U~nHmIXfYhhI60-OIJ~CF~C8uzB8sTdfyCA1JJ8JjGIQ4wa6NC5URAulNdjeuFmFV-hfKNNL7TIsM4avMVJmtFc7afiYqU6ZKHMnYCOgESCXFbOH6lTnvZ7iKjtWHk3w-X8AMd~iQJzedLnCZw43OPxtNuc77gbLi660B9riDJ2YAYTQ4spj4VBxzVhtzSgPo-AqJ1qVq6CMlTCO4lt9I1AFNgSjdSwhg3JIONBVDq73A1WZD9STJDpL7-xHRZnbzsIxQ__";

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
