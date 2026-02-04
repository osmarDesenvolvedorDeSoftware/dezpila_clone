// Header Component - 10Pila TV Clone
// Design: Bold Entertainment Maximalism
// Features: Navigation, Logo, CTA button with red accent

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "CATÁLOGO", href: "#catalogo" },
    { label: "BENEFÍCIOS", href: "#beneficios" },
    { label: "COMO FUNCIONA?", href: "#como-funciona" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-green-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tighter">
              <span className="text-white">10PILA</span>
              <span className="text-red-600 ml-1">TV</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white text-sm font-semibold hover:text-red-600 transition-colors duration-300 border-b-2 border-transparent hover:border-green-500 pb-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <a
              href="https://wa.me/5516997555381?text=Olá,%20acabei%20de%20acessar%20o%20site%20da%2010Pila%20TV%20e%20quero%20conhecer%20os%20planos!"
              className="btn-cta text-sm decoration-0"
            >
              ASSINAR AGORA
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-white text-sm font-semibold py-2 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/5516997555381?text=Olá,%20acabei%20de%20acessar%20o%20site%20da%2010Pila%20TV%20e%20quero%20conhecer%20os%20planos!"
              className="btn-cta text-sm block mt-4 text-center decoration-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              ASSINAR AGORA
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
