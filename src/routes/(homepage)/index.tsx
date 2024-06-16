import FeaturesSection from "~/components/homepage/features-section";
import Footer from "~/components/homepage/footer";
import { HeroSection } from "~/components/homepage/hero-section";
import { NavigationHeader } from "~/components/homepage/navigation-header";

export default function Home() {
  return (
    <>
      <NavigationHeader />
      <HeroSection />
      <FeaturesSection title="Technologies" />
      <Footer />
    </>
  );
}
