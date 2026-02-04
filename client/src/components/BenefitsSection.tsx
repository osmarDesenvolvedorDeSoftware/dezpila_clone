// Benefits Section Component - 10Pila TV Clone
// Design: Red cards with icons and descriptions
// Features: 3 benefit cards, hover effects

import { benefits } from "@/lib/content";

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header with Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 h-px bg-red-600"></div>
          <span className="text-red-600 text-2xl font-bold">●</span>
          <span className="text-white text-lg md:text-xl font-bold">
            BENEFÍCIOS
          </span>
          <span className="text-red-600 text-2xl font-bold">●</span>
          <div className="flex-1 h-px bg-red-600"></div>
        </div>

        {/* Title */}
        <h2 className="text-white text-4xl md:text-5xl font-black text-center mb-4">
          Veja o que você terá com o <span className="text-red-600">10Pila TV</span>
        </h2>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="card-benefit group"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>

              {/* Description */}
              <p className="text-white/90 text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="https://wa.me/5516997555381?text=Olá,%20estou%20vendo%20os%20benefícios%20no%20site%20e%20quero%20assinar%20a%2010Pila%20TV!"
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
