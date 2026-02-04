import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional if we want controls

interface Game {
    id: string;
    league: string;
    home: string;
    away: string;
    homeLogo?: string;
    awayLogo?: string;
    time: string;
    score?: string;
    status: "scheduled" | "live" | "finished";
    channels: string[];
}

export default function SportsCarousel() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/sports/schedule")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setGames(data);
                }
            })
            .catch((err) => console.error("Failed to load games", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null; // Or a skeleton
    if (games.length === 0) return null; // Don't show if no games

    // Format time to HH:mm
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    };

    // Format Date to "Hoje" or "DD/MM"
    // const formatDate = ... (Simplifying for "Today's games")

    return (
        <section className="bg-black py-8 border-b border-zinc-900">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-red-600 text-xl font-bold">⚽</span>
                    <h2 className="text-white text-xl font-bold uppercase tracking-wide">
                        Jogos de Hoje
                    </h2>
                </div>

                {/* Carousel Container - Horizontal Scroll */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 min-w-[280px] md:min-w-[320px] flex flex-col gap-4 hover:border-red-600/30 transition-all hover:bg-zinc-900 snap-start shadow-lg"
                        >
                            {/* Header: League */}
                            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                                <span className="text-red-500">{game.league}</span>
                                {game.status === "live" && (
                                    <span className="flex items-center gap-1.5 text-red-600 animate-pulse">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                        AO VIVO
                                    </span>
                                )}
                            </div>

                            {/* Matchup & Time */}
                            <div className="flex items-center justify-between gap-2">
                                {/* Home */}
                                <div className="flex flex-col items-center gap-2 w-[35%]">
                                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full p-2">
                                        <img
                                            src={game.homeLogo || "https://placehold.co/48x48?text=?"}
                                            alt={game.home}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-white text-xs font-bold text-center line-clamp-2 min-h-[32px]">{game.home}</span>
                                </div>

                                {/* middle: Time or Score */}
                                <div className="flex flex-col items-center justify-center w-[30%]">
                                    {game.status === "live" || game.score ? (
                                        <div className="text-2xl font-black text-white tracking-tighter">
                                            {game.score || "0 - 0"}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-0.5">
                                            <span className="text-xl font-black text-white">{formatTime(game.time)}</span>
                                            <span className="text-[10px] text-zinc-500 font-bold">HOJE</span>
                                        </div>
                                    )}
                                </div>

                                {/* Away */}
                                <div className="flex flex-col items-center gap-2 w-[35%]">
                                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full p-2">
                                        <img
                                            src={game.awayLogo || "https://placehold.co/48x48?text=?"}
                                            alt={game.away}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-white text-xs font-bold text-center line-clamp-2 min-h-[32px]">{game.away}</span>
                                </div>
                            </div>

                            {/* Channels Footer */}
                            <div className="mt-2 pt-3 border-t border-zinc-800/50">
                                <p className="text-[9px] text-zinc-600 font-bold uppercase mb-2 tracking-tighter">Transmissão</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {game.channels && game.channels.length > 0 ? (
                                        game.channels.map((ch, i) => (
                                            <span
                                                key={i}
                                                className="text-[11px] font-black bg-white/5 text-zinc-300 px-2 py-1 rounded border border-white/5 hover:border-red-600/50 transition-colors whitespace-nowrap"
                                            >
                                                {ch.replace(" (Bra)", "")}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-[10px] text-zinc-600 italic">Não disponível</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
