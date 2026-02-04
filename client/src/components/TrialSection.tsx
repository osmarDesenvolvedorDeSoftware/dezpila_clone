import { MessageCircle, Send, PlayCircle, Monitor, Globe, Tv, Zap, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";

export default function TrialSection() {
    const steps = [
        {
            icon: <MessageCircle className="w-8 h-8 text-red-600" />,
            title: "1. Peça seu Teste",
            description: "Clique no botão e fale conosco pelo WhatsApp em um segundo."
        },
        {
            icon: <Send className="w-8 h-8 text-red-600" />,
            title: "2. Receba o Acesso",
            description: "Nossa equipe envia seu login e senha na hora, sem burocracia."
        },
        {
            icon: <PlayCircle className="w-8 h-8 text-red-600" />,
            title: "3. Assista e Aproveite",
            description: "São 4 horas de sinal liberado em HD para você testar tudo."
        }
    ];

    return (
        <section id="como-funciona" className="bg-zinc-950 py-20 border-t border-zinc-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
                        Como funciona o <span className="text-red-600">Teste Grátis?</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto uppercase text-xs font-bold tracking-[0.3em]">
                        Simples, rápido e 100% liberado por 4 horas
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-red-600/30 transition-all text-center group"
                        >
                            <div className="bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/10 transition-colors">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tighter italic">{step.title}</h3>
                            <p className="text-zinc-400 leading-relaxed font-light">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-24 border-t border-zinc-900 pt-20">
                    <div className="text-center mb-16">
                        <h3 className="text-2xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
                            Onde <span className="text-red-600">Assistir?</span>
                        </h3>
                        <p className="text-zinc-400 max-w-xl mx-auto uppercase text-[10px] font-black tracking-[0.3em]">Compatível com todos os seus dispositivos</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                        {[
                            { name: "Smart TV", desc: "Samsung, LG, Android TV", icon: "📺" },
                            { name: "TV Box", desc: "Fire Stick, Mi Box, etc", img: "/logos/tvbox.jpg" },
                            { name: "Celular", desc: "Android e iPhone (iOS)", icon: "📱" },
                            { name: "Computador", desc: "WebPlayer no Navegador", icon: "💻" }
                        ].map((dev, i) => (
                            <div key={i} className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 text-center hover:border-red-600/30 transition-all flex flex-col items-center justify-center group overflow-hidden">
                                <div className="h-16 flex items-center justify-center mb-3">
                                    {dev.img ? (
                                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                            <img src={dev.img} alt={dev.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">{dev.icon}</div>
                                    )}
                                </div>
                                <h4 className="text-white font-black mb-1 uppercase text-xs italic">{dev.name}</h4>
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap">{dev.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-12">
                        <h4 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
                            🚀 Apps <span className="text-red-600">Premium</span>
                        </h4>
                        <p className="text-zinc-400 max-w-xl mx-auto uppercase text-[10px] font-black tracking-[0.3em]">Instalação rápida e suporte garantido</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                        {/* PREX21 - Featured */}
                        <div className="bg-zinc-900 border-2 border-red-600 p-4 md:p-6 rounded-2xl flex flex-col items-center text-center shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:scale-105 transition-all relative overflow-hidden group col-span-2 lg:col-span-1">
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full z-10 animate-pulse">RECOMENDADO</div>
                            <div className="w-20 h-20 md:w-24 md:h-24 mb-4 rounded-2xl overflow-hidden bg-white p-2 shadow-xl group-hover:rotate-3 transition-transform">
                                <img src="/logos/prex21.webp" alt="PREX21" className="w-full h-full object-contain" />
                            </div>
                            <h5 className="text-white font-black text-sm md:text-lg mb-1 uppercase italic tracking-tighter">PREX21 PLAYER</h5>
                            <div className="bg-zinc-800/50 px-3 py-2 rounded-xl border border-white/5 mb-3 w-full">
                                <p className="text-zinc-400 font-bold text-[8px] md:text-[9px] text-center uppercase mb-1">Status</p>
                                <p className="text-green-500 font-black text-[10px] md:text-xs text-center uppercase flex items-center justify-center gap-1">
                                    <Zap className="w-3 h-3 fill-current" /> Online
                                </p>
                            </div>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.cb.prexc&hl=pt_BR"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-red-600 hover:bg-red-700 text-white text-[9px] md:text-[10px] font-black py-2 md:py-3 rounded-xl uppercase tracking-widest shadow-[0_4px_20px_rgba(220,38,38,0.5)] transition-all active:scale-95"
                            >
                                Baixar Agora
                            </a>
                        </div>

                        {[
                            { name: "PLAY SIM", logo: "/logos/playsim.png", feat: "Canais 4K", status: "Liberação Zap" },
                            { name: "CORE PLAYER", logo: "/logos/core player.png", feat: "Anti-Trava", status: "Painel Ativo" },
                            { name: "ASSIST+", logo: "/logos/assit+.webp", feat: "Filmes & Series", status: "VOD Premium" },
                            { name: "XCLOUD", logo: "/logos/xcloud.jpg", feat: "Lançamentos", status: "Full HD/4K" }
                        ].map((app, i) => (
                            <div key={i} className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 rounded-2xl flex flex-col items-center text-center hover:border-red-600/50 transition-all group">
                                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 rounded-xl overflow-hidden bg-white/5 p-2 group-hover:scale-110 transition-transform">
                                    <img src={app.logo} alt={app.name} className="w-full h-full object-contain" />
                                </div>
                                <h5 className="text-white font-black text-sm md:text-base mb-2 uppercase italic tracking-tighter">{app.name}</h5>
                                <div className="bg-zinc-900/50 px-3 py-3 rounded-xl border border-white/5 mb-3 w-full group-hover:bg-zinc-900 transition-colors">
                                    <p className="text-zinc-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1">Disponibilidade</p>
                                    <p className="text-red-600 font-black text-[10px] md:text-sm uppercase tracking-tighter">Ativação no Teste</p>
                                </div>
                                <span className="text-[8px] md:text-[9px] text-zinc-500 uppercase font-black px-3 py-1 bg-zinc-900 rounded-full border border-white/5 whitespace-nowrap group-hover:text-zinc-300 transition-colors">
                                    {app.feat}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-b from-zinc-900 to-black rounded-3xl p-8 border border-zinc-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full"></div>
                            <h5 className="text-white font-black text-xl uppercase italic mb-8 flex items-center gap-3">
                                <Monitor className="w-6 h-6 text-red-600" /> Apps Downloader
                            </h5>
                            <div className="grid gap-4">
                                {[
                                    { name: "UNI TV PRO", code: "5798301", link: "http://aftv.news/5798301" },
                                    { name: "IBO 4K", code: "9384271", link: "http://aftv.news/9384271" },
                                    { name: "IBO CONECT VIA MAC", code: "6723269", link: "http://aftv.news/6723269" },
                                    { name: "IBO CONECT", code: "9212587", link: "http://aftv.news/9212587" }
                                ].map((app, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-zinc-950 rounded-2xl border border-white/5 hover:border-red-600/30 transition-all group">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-white font-black text-sm uppercase italic tracking-tighter group-hover:text-red-600 transition-colors">{app.name}</p>
                                            <a href={app.link} target="_blank" className="text-[10px] text-zinc-600 font-bold hover:text-white transition-colors uppercase tracking-widest truncate max-w-[200px]">{app.link.replace("http://", "")}</a>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-zinc-500 text-[8px] font-black uppercase tracking-widest mb-1">Code Downloader</p>
                                            <p className="text-red-600 font-black text-2xl tracking-tighter leading-none">{app.code}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-zinc-900 to-black rounded-3xl p-8 border border-zinc-800 relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-600/5 blur-3xl rounded-full"></div>
                            <h5 className="text-white font-black text-xl uppercase italic mb-8 flex items-center gap-3">
                                <Globe className="w-6 h-6 text-green-600" /> Web & Smart TV
                            </h5>
                            <div className="space-y-6">
                                <div className="p-6 bg-zinc-950 rounded-2xl border-2 border-green-600/20 shadow-[0_0_20px_rgba(22,163,74,0.05)] relative overflow-hidden group hover:border-green-600/40 transition-all">
                                    <div className="absolute top-0 right-0 bg-green-600 text-white text-[8px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Instantâneo</div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-white font-black text-lg uppercase italic tracking-tighter">WebPlayer <span className="text-green-600">Oficial</span></p>
                                            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Assista agora pelo navegador</p>
                                        </div>
                                        <a
                                            href="http://conectstar.webplayer.one/login"
                                            target="_blank"
                                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-black px-8 py-3 rounded-xl uppercase tracking-widest transition-all shadow-[0_4px_15px_rgba(22,163,74,0.3)] hover:scale-105 active:scale-95"
                                        >
                                            Abrir Player
                                        </a>
                                    </div>
                                    <div className="bg-orange-600/10 p-5 rounded-xl border-2 border-orange-600/30 relative overflow-hidden group/alert">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-600"></div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-orange-600/20 group-hover:scale-110 transition-transform">
                                                🦊
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <AlertTriangle className="w-4 h-4 text-orange-500 animate-bounce" />
                                                    <p className="text-orange-500 text-xs font-black uppercase italic tracking-tighter">Aviso Obrigatório</p>
                                                </div>
                                                <p className="text-white font-black text-sm uppercase italic leading-tight mb-2 tracking-tighter">
                                                    Use <span className="text-orange-500 underline underline-offset-4 decoration-2">SOMENTE</span> o navegador Firefox
                                                </p>
                                                <p className="text-zinc-500 text-[9px] font-bold uppercase italic leading-tight mb-3">
                                                    Outros navegadores (Chrome, Safari, Edge) podem apresentar travamentos e falhas de sinal.
                                                </p>
                                                <a
                                                    href="https://www.mozilla.org/pt-BR/firefox/new/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-[10px] font-black text-orange-500 hover:text-white transition-colors uppercase tracking-widest"
                                                >
                                                    Baixar Firefox Aqui <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center min-h-[140px] group hover:bg-zinc-900/30 transition-all">
                                    <Tv className="w-8 h-8 text-zinc-700 mb-3 group-hover:text-red-600 transition-colors" />
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center">Configuração SmartUP / STB</p>
                                    <p className="text-white/60 font-black text-sm text-center uppercase italic border-b border-red-600/30 pb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Suporte no WhatsApp
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="https://wa.me/5516997555381?text=Quero%20meu%20teste%20gr%C3%A1tis%20de%204%20horas%20na%2010Pila%20TV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white text-xl font-black px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(22,163,74,0.3)] uppercase italic"
                    >
                        <MessageCircle className="w-6 h-6" />
                        Liberar meu teste agora
                    </a>
                    <p className="text-zinc-500 text-sm mt-4 uppercase font-bold tracking-widest">
                        Ativação imediata • Sem necessidade de cartão
                    </p>
                </div>
            </div>
        </section>
    );
}
