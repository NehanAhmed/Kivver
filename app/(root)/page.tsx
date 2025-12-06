import { Hero } from "@/app/(root)/_components/Hero";
import { Stats } from "./_components/Stats";
import { Features } from "./_components/Features";
import { HowItWorks } from "./_components/HowItWorks";
import { CTA } from "./_components/CTA";
import { Footer } from "./_components/Footer";
import { FeaturedCoursesSection } from "./_components/FeaturedCourses";
import { fetchAllCourses } from "@/lib/apiFetches/SellerCourses";


export default async function App() {
  const courses = await fetchAllCourses();
  return (
    <div className="">
      <Hero />
      <Stats />
      <Features />
      <FeaturedCoursesSection courses={courses} />
      <HowItWorks />
      <CTA />
    </div>
  );
}
