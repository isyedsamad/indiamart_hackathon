import Categories from "@/components/ui/Categories";
import FinalCTA from "@/components/ui/FinalCTA";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import HowItWorks from "@/components/ui/HowItWorks";
import IntentSection from "@/components/ui/IntentSection";
import TrustSection from "@/components/ui/TrustSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IntentSection />
      <TrustSection />
      <HowItWorks />
      <Categories />
      <FinalCTA />
      <Footer />
    </>
  );
}
