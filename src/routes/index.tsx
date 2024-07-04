import {FooterSection} from "~/components/common/footer";
import {FeatureSection} from "~/components/module/index/feature-section";
import {Header} from "~/components/module/index/header";
import {HeroSection} from "~/components/module/index/hero-section";

export default function Home() {
  return (
    <>
      <Header />
      <main class="w-full space-y-2 flex flex-col justify-center relative min-h-screen">
        <HeroSection />
        <FeatureSection />
      </main>
      <FooterSection />
    </>
  );
}
