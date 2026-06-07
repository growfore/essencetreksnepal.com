import { FeaturedTrip } from "@/components/featured-trip";
import CategorySection from "@/components/sections/category-section";
import FeaturedSections from "@/components/sections/featuered-sections";
import OldHeroSection from "@/components/sections/old-hero";
import WhySection from "@/components/sections/why-section";
import Testimonials from "@/components/testimonials";

export default async function Homepage() {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured?includeActivity=true`,
    );

    data = await res.json();
  } catch (error) {
    console.error("Error loading homepage:", error);
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600">
            Failed to load content. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  const featured = data?.data;
  const featuredWithoutTOM = featured.featuredTags.filter(
    (tag: any) => tag.slug !== "trip-of-the-month",
  );
  const firstFeatured = featuredWithoutTOM.slice(0, 1);
  const secondFeatured = featuredWithoutTOM.slice(1, 3);

  return (
    <>
      {/*<HomeHero />*/}
      <OldHeroSection />
      <CategorySection />
      <FeaturedSections featuredTags={firstFeatured} />
      <WhySection />
      <FeaturedTrip />
      <Testimonials />
      {/*<FeaturedSections featuredTags={firstFeatured} />*/}
      <FeaturedSections featuredTags={secondFeatured} />
    </>
  );
}
