// Content data for Dezpila Clone
// Design Philosophy: Entertainment Maximalism - Bold colors, clear hierarchy, dynamic elements

export interface Movie {
  id: string;
  title: string;
  category: "FILME" | "SÉRIE";
  rating: number;
  image: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
}

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  screens: number;
  features: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Featured movies and series
export const featuredContent: Movie[] = [
  {
    id: "1",
    title: "Horizonte Perdido",
    category: "FILME",
    rating: 8.5,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
  },
  {
    id: "2",
    title: "Série Mistério",
    category: "SÉRIE",
    rating: 9.0,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
  },
  {
    id: "3",
    title: "Ação Extrema",
    category: "FILME",
    rating: 8.2,
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300&h=450&fit=crop",
  },
  {
    id: "4",
    title: "Drama Profundo",
    category: "SÉRIE",
    rating: 8.8,
    image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=300&h=450&fit=crop",
  },
  {
    id: "5",
    title: "Ficção Científica",
    category: "FILME",
    rating: 8.7,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=450&fit=crop",
  },
  {
    id: "6",
    title: "Comédia Hilária",
    category: "SÉRIE",
    rating: 8.4,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
  },
];

// Live channels
export const channels: Channel[] = [
  {
    id: "1",
    name: "HBO",
    logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=100&fit=crop",
  },
  {
    id: "2",
    name: "NBA",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Animal Planet",
    logo: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=100&fit=crop",
  },
  {
    id: "4",
    name: "ESPN",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=100&fit=crop",
  },
  {
    id: "5",
    name: "History",
    logo: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=100&fit=crop",
  },
  {
    id: "6",
    name: "Premier League",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=100&fit=crop",
  },
  {
    id: "7",
    name: "Fox Sports",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=100&fit=crop",
  },
  {
    id: "8",
    name: "Pix Megapix",
    logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=100&fit=crop",
  },
  {
    id: "9",
    name: "TNT",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=100&fit=crop",
  },
];

// Subscription plans
export const plans: Plan[] = [
  {
    id: "1",
    name: "Mensal 1 Tela",
    duration: "1 mês",
    price: 10.0,
    screens: 1,
    features: [
      "Assista em até 1 Tela",
      "Qualidade Full HD e 4K",
      "+ de 25.000 conteúdos",
      "Canais adultos",
      "Suporte diário",
    ],
  },
  {
    id: "2",
    name: "Mensal 2 Telas",
    duration: "1 mês",
    price: 19.0,
    screens: 2,
    features: [
      "Assista em até 2 Telas",
      "Qualidade Full HD e 4K",
      "+ de 25.000 conteúdos",
      "Canais adultos",
      "Suporte diário",
    ],
  },
  {
    id: "3",
    name: "Trimestral 2 Telas",
    duration: "3 meses",
    price: 50.0,
    screens: 2,
    features: [
      "Assista em até 2 Telas",
      "Qualidade Full HD e 4K",
      "+ de 25.000 conteúdos",
      "Canais adultos",
      "Suporte diário",
    ],
  },
  {
    id: "4",
    name: "Trimestral 4 Telas",
    duration: "3 meses",
    price: 90.0,
    screens: 4,
    features: [
      "Assista em até 4 Telas",
      "Qualidade Full HD e 4K",
      "+ de 25.000 conteúdos",
      "Canais adultos",
      "Suporte diário",
    ],
  },
];

// Benefits
export const benefits: Benefit[] = [
  {
    id: "1",
    title: "Sem anúncios",
    description: "Assista sem interrupções, sem anúncios chatos.",
    icon: "🚫",
  },
  {
    id: "2",
    title: "Alta Resolução",
    description: "Assista conteúdos na melhor qualidade em FullHD e 4k",
    icon: "📺",
  },
  {
    id: "3",
    title: "Só DezPila",
    description: "Pague por muito conteúdo, sem perder sua carteira.",
    icon: "💰",
  },
];
