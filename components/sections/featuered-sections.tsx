import FeaturedScroll from "../featured-scroll";
import { decodeHtmlEntities } from "@/lib/html-decoder";

export default async function FeaturedSections({
  featuredTags,
}: {
  featuredTags: any;
}) {
  return (
    <section className="bg-canvas-soft py-16 md:py-24 relative overflow-hidden">
      {/* Decorative mesh */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 20%, #0070f3 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 80%, #7928ca 0%, transparent 60%)",
        }}
      />
      <div className="relative container mx-auto px-4 md:px-8">
        {featuredTags.map((tag: any, index: number) => (
          <div key={index} className="mb-16 last:mb-0">
            <div className="flex flex-col items-start gap-3 mb-8 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-wider text-mute">
                {tag.name.split("::")[1] || ""}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold -tracking-[1.28px] text-ink">
                {tag.name.split("::")[0] || tag.name}
              </h2>
              {tag.description && (
                <div
                  className="text-body text-base leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(tag.description),
                  }}
                />
              )}
            </div>
            <FeaturedScroll activities={tag.activity} />
          </div>
        ))}
      </div>
    </section>
  );
}
