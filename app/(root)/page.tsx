import { Hero } from "@/app/(root)/_components/Hero";
import { Stats } from "./_components/Stats";
import { Features } from "./_components/Features";
import { HowItWorks } from "./_components/HowItWorks";
import { CTA } from "./_components/CTA";
import { Footer } from "./_components/Footer";


export default function App() {
  return (
    <div className="">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
}
