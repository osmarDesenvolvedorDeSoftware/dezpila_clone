import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/5516997555381?text=Olá,%20acabei%20de%20ver%20o%20site%20da%2010Pila%20TV%20e%20quero%20um%20teste%20grátis!"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.5)] transition-all hover:scale-110 active:scale-90 animate-bounce-slow"
            aria-label="Falar no WhatsApp"
        >
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
            </span>
        </a>
    );
}
