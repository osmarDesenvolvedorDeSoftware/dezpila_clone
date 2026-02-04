// Footer Component - 10Pila TV Clone
// Design: Contact info, social links, tagline
// Features: WhatsApp contact, social media links

import { MessageCircle, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Contact Section */}
        <div className="text-center mb-12">
          <p className="text-gray-300 text-lg mb-6">
            Estamos sempre aqui para ajudar, entre em contato com nossa equipe de suporte:
          </p>
          <a
            href="https://wa.me/5516997555381?text=Olá,%20acabei%20de%20ver%20o%20site%20da%2010Pila%20TV%20e%20gostaria%20de%20mais%20informações!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-cta"
          >
            <MessageCircle size={20} />
            ENTRE EM CONTATO PELO WHATSAPP
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-12">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-600 transition-colors duration-300"
          >
            <Youtube size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-600 transition-colors duration-300"
          >
            <Instagram size={28} />
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8"></div>

        {/* Tagline */}
        <p className="text-center text-gray-400 text-sm">
          10Pila TV, o melhor streaming desde 2023, possui alto nível de satisfação dos clientes.
        </p>
      </div>
    </footer>
  );
}
