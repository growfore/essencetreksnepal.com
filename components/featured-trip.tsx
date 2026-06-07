import Image from "next/image";
import Link from "next/link";
import { getFullImageUrl } from "@/lib/getFullImageUrl";
import { LucideArrowRight } from "lucide-react";

export async function FeaturedTrip() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured/trip-of-the-month?includeActivity=true`,
  );
  const json = await res.json();

  const feature = json.data;
  const activity = feature.featuredTag.activity[0];

  const title = activity.title.split(":")[0];
  const description =
    activity.shortDescription ||
    activity.excerpt ||
    `Experience the majesty of the Himalayas with our expertly guided ${title.toLowerCase()} tour.`;

  return (
    <section className="bg-[#f3f3f3] py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-16">
        <div className="grid md:grid-cols-[45%_55%] gap-12 md:gap-24 items-center">
          <div className="space-y-6 md:space-y-8">
            <p className="text-xs md:text-sm uppercase tracking-[0.15em] text-mute">
              Trip of the Month
            </p>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.05] -tracking-[1.5px]">
              {title}
            </h2>

            <p className="text-base md:text-lg text-body leading-[1.7] max-w-[520px]">
              {description}
            </p>

            <div className="flex items-center gap-2 text-sm text-body">
              <span className="font-semibold text-ink">{activity.duration}</span>
              <span className="text-mute">&middot;</span>
              <span>
                From{" "}
                <span className="font-semibold text-ink">
                  ${activity.price}
                </span>{" "}
                per person
              </span>
            </div>

            <Link
              href={`/package/${activity.slug}`}
              className="inline-flex items-center gap-2 rounded-pill bg-ink text-on-primary px-8 py-3 text-xs uppercase tracking-[0.1em] font-semibold hover:bg-ink/90 transition-colors"
            >
              Explore Trip
              <LucideArrowRight className="size-4" />
            </Link>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm group">
            <Image
              src={getFullImageUrl(activity.images[0])}
              fill
              alt={title}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
