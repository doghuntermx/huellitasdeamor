import { Hero } from "@/components/home/Hero";
import { FeaturedAnimals } from "@/components/home/FeaturedAnimals";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { ImpactTeaser } from "@/components/home/ImpactTeaser";
import { NeedSection } from "@/components/home/NeedSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedAnimals />
      <StoryTeaser />
      <ImpactTeaser />
      <NeedSection />
    </>
  );
}
