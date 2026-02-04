// Home Page - 10Pila TV Clone
// Design: Entertainment Maximalism with Bold Red & Black
// Features: Complete landing page with all sections

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import LiveChannelsSection from "@/components/LiveChannelsSection";
import BenefitsSection from "@/components/BenefitsSection";
import PlansSection from "@/components/PlansSection";
import Footer from "@/components/Footer";

import SportsCarousel from "@/components/SportsCarousel";
import TrialSection from "@/components/TrialSection";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <SportsCarousel />
        <TrialSection />
        <CatalogSection />
        <LiveChannelsSection />
        <BenefitsSection />
        <PlansSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
