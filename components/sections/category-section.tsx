import CategoryCard from "../card/category-card";

export default async function CategorySection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/trip-category`,
  );

  const json = await res.json();
  const data = json.data;
  const categories = data.tripCategories;

  const categoriesExceptDefault = categories.filter(
    (cat: any) => cat.categoryHandle !== "default",
  );

  return (
    <section className="bg-canvas-soft border-y border-hairline relative overflow-hidden">
      {/* Decorative mesh */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, #50e3c2 0%, transparent 60%)",
        }}
      />
      <div className="relative container mx-auto px-4 md:px-8 py-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-max">
          {categoriesExceptDefault.map((category: any) => (
            <CategoryCard
              key={category.id}
              text={category.categoryName}
              image={`${process.env.NEXT_PUBLIC_API_BASE_URL}${category.categoryImage}`}
              link={category.categoryHandle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
