// Plans Section Component - Dezpila TV Clone
// Design: 4 pricing cards in 2x2 grid
// Features: Plan comparison, features list, CTA buttons

import { plans } from "@/lib/content";
import { Check } from "lucide-react";

export default function PlansSection() {
  return (
    <section id="planos" className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-white text-4xl md:text-5xl font-black text-center mb-4">
          Selecione <span className="text-red-600">o seu plano:</span>
        </h2>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card-plan flex flex-col"
            >
              {/* Plan Name */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  DezPila <span className="text-red-600">{plan.name}</span>
                </h3>
                <p className="text-sm text-gray-600 font-semibold">
                  Acesso por {plan.duration}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-black text-red-600">
                  R$ {plan.price.toFixed(2)}
                </p>
              </div>

              {/* CTA Button */}
              <a
                href="#"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-all duration-300 mb-6 text-center"
              >
                ASSINAR AGORA
              </a>

              {/* Tagline */}
              <p className="text-center text-gray-600 font-semibold text-sm mb-6 pb-6 border-b border-gray-300">
                Diversão garantida
              </p>

              {/* Features List */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className="text-red-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-900 text-sm font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
