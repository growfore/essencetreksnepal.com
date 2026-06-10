import {
  LucideCheckCircle2,
  LucideInfo,
  LucidePlayCircle,
  LucideXCircle,
} from "lucide-react";
export const dynamic = "force-static";
export const revalidate = 3600;
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?page=1&limit=1000`,
  );
  const data = await res.json();
  const trips: any[] = data.data || [];
  return trips.map((trip) => ({ slug: trip.slug }));
}
import ImageGallery from "@/components/image-gallery";
import PricingCardSidebar from "@/components/card/pricing-card";
import { AdditionalInfoRenderer } from "@/components/additional-info-renderer";
import { TripFaqs } from "@/components/v0/trip-faqs";
import { TripItinerary } from "@/components/v0/trip-itinerary";
import { TripOverview } from "@/components/v0/trip-overview";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Script from "next/script";
import TripAdvisorRatingBadge from "@/components/tripadvisor-rating-badge";
import GoogleRatingBadge from "@/components/google-rating-badge";
import { Separator } from "@/components/ui/separator";
import { SectionNavigation } from "@/components/section-nav";
import { BottomBookingBar } from "@/components/bottom-booking-bar";
import { safeParseSchema } from "@/lib/safeParseSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const param = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity/slug/${param.slug}`,
  );

  if (res.status === 404) {
    const redirectedSlug = res.url.split("/slug/")[1];

    if (redirectedSlug && redirectedSlug !== param.slug) {
      redirect(`/package/${redirectedSlug}`);
    }

    return notFound();
  }

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  const trip = data.data;

  return {
    title: trip.seo?.metaTitle,
    description: trip.seo.metaDescription,
    openGraph: {
      title: trip.seo.metaTitle,
      description: trip.seo.metaDescription,
      images: [
        {
          url: trip?.seo?.featuredMedia,
          width: 800,
          height: 600,
          alt: trip?.seo?.metaTitle,
        },
      ],
    },
    twitter: {
      title: trip.seo.metaTitle,
      description: trip.seo.metaDescription,
      images: [
        {
          url: trip?.seo?.featuredMedia,
          width: 800,
          height: 600,
          alt: trip?.seo?.metaTitle,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity/slug/${slug}`,
  );

  if (res.status === 404) {
    const redirectedSlug = res.url.split("/slug/")[1];

    if (redirectedSlug && redirectedSlug !== slug) {
      redirect(`/package/${redirectedSlug}`);
    }

    return notFound();
  }

  if (!res.ok) {
    notFound();
  }

  if (res.status == 404) {
    return notFound();
  }

  if (!res.ok) {
    return (
      <main>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold">Failed to fetch.</h1>
          <p className="mt-2 text-muted-foreground">
            The trip data could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  const jsonres = await res.json();

  const trip = jsonres.data;

  return (
    <main className="min-h-screen bg-primary/5">
      {/*Schema */}
      {trip.seo?.schema && (
        <Script
          id="schema"
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(safeParseSchema(trip.seo.schema)),
          }}
        ></Script>
      )}
      <div className="container mx-auto py-4 md:py-8 px-4 md:px-0">
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">
          {trip.title}
        </h1>
        <div className="flex items-center gap-2">
          {/*Rated {siteConfig.reviews.tripadvisor.rating}/5 in Tripadvisor*/}
          <div className="flex flex-row flex-wrap items-center gap-2 md:gap-4">
            <GoogleRatingBadge />
            <Separator orientation="vertical" className="h-4 md:h-6" />
            <TripAdvisorRatingBadge light />
          </div>
        </div>
      </div>

      <ImageGallery images={trip.images} keywords={trip.keywords || []} />

      {/*Content starts */}
      <SectionNavigation />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 min-w-0">
          <div className="col-span-3 min-w-0!">
            <TripOverview trip={trip} />
            <div
              className="col-span-2
            content-body
             prose-base leading-loose
             prose-headings:text-gray-900 prose-headings:font-bold
             prose-h1:text-xl md:prose-h1:text-3xl
             prose-h2:text-xl md:prose-h2:text-3xl  prose-h2:font-bold
             prose-h3:text-base md:prose-h3:text-xl
             prose-h4:text-sm md:prose-h4:text-lg
             prose-p:leading-relaxed  prose-p:text-base md:prose-p:text-xl
             prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary hover:prose-a:underline
            prose-strong:text-black prose-strong:font-bold
             prose-ul:my-2 prose-ol:my-2
            prose-li:text-gray-700 prose-li:mb-1
             prose-blockquote:border-l-4 prose-blockquote:border-primary/70 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
             prose-img:rounded-lg prose-img:my-6
             prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
             prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
             prose-ul:list-none
             prose-li:relative prose-li:pl-8 prose-li:text-base md:prose-li:text-xl
             prose-li:before:absolute
             prose-li:before:left-0
             prose-li:before:top-[0.45em]
             prose-li:before:w-4 prose-li:before:h-4
             prose-li:before:mask-[url('/icons/highlight.png')]
             prose-li:before:mask-contain
             prose-li:before:mask-no-repeat
             prose-li:before:bg-primary
             prose max-w-none w-full
            wrap-break-word
             **:wrap-break-word
                   "
            >
              <TripItinerary trip={trip} />
              {trip.map && (
                <div
                  id="map"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(trip.map),
                  }}
                />
              )}

              {trip.videoUrl && (
                <>
                  <h2 className="flex gap-1 items-center ">
                    <LucidePlayCircle className="text-primary size-8" />{" "}
                    {trip.title}
                    &apos;s Video
                  </h2>
                  <div
                    id="video"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtmlEntities(trip.videoUrl),
                    }}
                  />
                </>
              )}

              <div>
                <h2 className="flex gap-4 items-center">
                  <LucideCheckCircle2 /> Inclusions
                </h2>
                <div
                  id="inclusions"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(trip.inclusions[0]),
                  }}
                  className="bg-primary/20 p-2 w-full mt-4 rounded-sm
                    prose-li:before:mask-[url('/icons/greentick.png')]
                    prose-li:before:rotate-360
                     "
                />
              </div>

              <div>
                <h2 className="flex gap-4 items-center text-rose-900!">
                  <LucideXCircle className="text-rose-900" /> Exlusions{" "}
                </h2>
                <div
                  id="exclusions"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(trip.exclusions[0]),
                  }}
                  className="w-full bg-rose-500/30 p-2 rounded-sm  mt-4 prose-li:before:mask-[url('/icons/cross.png')]"
                />
              </div>

              {trip.additionalInfo.length > 0 && (
                <>
                  <h2
                    id="trip-info"
                    className="font-bold  my-4 flex items-center gap-2"
                  >
                    <LucideInfo className="size-8" /> Trip Information
                  </h2>
                  {trip.additionalInfo.map((info: any, idx: any) => {
                    return (
                      <AdditionalInfoRenderer
                        key={idx}
                        index={idx}
                        item={info}
                      />
                    );
                  })}
                </>
              )}
              <div id="faqs">
                {trip.faqs && trip.faqs.length > 1 && <TripFaqs trip={trip} />}
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:flex">
            <div>
              <PricingCardSidebar
                slug={slug}
                title={trip.title}
                price={trip.price}
                maxPrice={trip.price * 0.2}
              />
            </div>
          </div>
        </div>
      </div>
      <BottomBookingBar price={trip.price} slug={slug} title={trip.title} />
    </main>
  );
}
