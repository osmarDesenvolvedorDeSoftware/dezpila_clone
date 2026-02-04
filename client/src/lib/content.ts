// Content data for 10Pila TV Clone
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
  whatsappMessage?: string;
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
// Live channels
// Based on January 2026 Audience Ratings
// Logos are served locally from public/logos/
export const channels: Channel[] = [
  { id: "1", name: "Globo", logo: "/logos/globo.png" },
  { id: "2", name: "Record", logo: "/logos/record.png" },
  { id: "3", name: "SBT", logo: "/logos/sbt.png" },
  { id: "4", name: "Band", logo: "/logos/band.png" },
  { id: "5", name: "RedeTV!", logo: "/logos/redetv.png" },
  { id: "6", name: "Cultura", logo: "/logos/cultura.svg" },
  { id: "7", name: "Viva", logo: "/logos/viva.jpg" },
  { id: "8", name: "Record News", logo: "/logos/record_news.png" },
  { id: "9", name: "SporTV", logo: "/logos/sportv.png" },
  { id: "10", name: "GloboNews", logo: "/logos/globonews.png" },
  { id: "11", name: "Multishow", logo: "/logos/multishow.png" },
  { id: "12", name: "ESPN", logo: "/logos/espn.webp" },
  { id: "13", name: "Universal TV", logo: "/logos/universal.png" },
  { id: "14", name: "AXN", logo: "/logos/axn.png" },
  { id: "15", name: "Discovery Channel", logo: "/logos/discovery.png" },
  { id: "16", name: "Cartoon Network", logo: "/logos/cartoon_network.png" },
  { id: "17", name: "Warner TV", logo: "/logos/warner.png" },
  { id: "18", name: "Megapix", logo: "/logos/megapix.png" },
  { id: "19", name: "SporTV 2", logo: "/logos/sportv2.png" },
  { id: "20", name: "TNT", logo: "/logos/tnt.png" },
  { id: "21", name: "Space", logo: "/logos/Space.webp" },
  { id: "22", name: "Star Channel", logo: "/logos/star.svg" },
  { id: "23", name: "Premiere", logo: "/logos/premiere.png" },
  { id: "24", name: "HBO", logo: "/logos/hbo.png" },
  { id: "25", name: "Telecine Premium", logo: "/logos/telecine.png" },
  { id: "26", name: "CNN Brasil", logo: "/logos/cnn.png" },
  { id: "27", name: "Paramount Network", logo: "/logos/paramount.svg" },
  { id: "28", name: "Disney Channel", logo: "/logos/disney.png" },
  { id: "29", name: "MTV", logo: "/logos/mtv.png" },
  { id: "30", name: "Comedy Central", logo: "/logos/comedy.svg" },
];

// Subscription plans
export const plans: Plan[] = [
  {
    id: "1",
    name: "Mensal 1 Tela",
    duration: "1 mês",
    price: 10.0,
    screens: 1,
    whatsappMessage: "Olá,%20quero%20assinar%20o%20plano%20Mensal%201%20Tela%20da%2010Pila%20TV!",
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
    whatsappMessage: "Olá,%20quero%20assinar%20o%20plano%20Mensal%202%20Telas%20da%2010Pila%20TV!",
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
    whatsappMessage: "Olá,%20quero%20assinar%20o%20plano%20Trimestral%202%20Telas%20da%2010Pila%20TV!",
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
    whatsappMessage: "Olá,%20quero%20assinar%20o%20plano%20Trimestral%204%20Telas%20da%2010Pila%20TV!",
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
    title: "Só 10Pila",
    description: "Pague por muito conteúdo, sem perder sua carteira.",
    icon: "💰",
  },
];
