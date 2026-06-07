import {
  ChevronRight,
  LucideBriefcase,
  LucideCalendar,
  LucideCheckCheck,
  LucideCircleQuestionMark,
  LucideDollarSign,
  LucideStar,
  LucideUsers,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import TripAdvisorRatingBadge from "../tripadvisor-rating-badge";
import Link from "next/link";
import GoogleRatingBadge from "../google-rating-badge";

export default function WhySection() {
  return (
    <div className="relative min-h-[60vh] bg-primary/5 py-12 justify-between flex flex-col px-4">
      <div className="flex gap-8 max-w-7xl mx-auto">
        <div className="grid-cols-2 rounded-xs overflow-hidden hidden md:grid">
          <div className="bg-primary/70 p-8 flex flex-col gap-2 items-center justify-center">
            <LucideBriefcase className="text-white size-16" />
            <span className="font-bold text-white text-sm md:text-lg">
              Seamless Logistics
            </span>
            <p className="text-white text-center">No hassles, no delays.</p>
          </div>

          {/*item 2*/}
          <div className="bg-emerald-800/50 p-4 flex flex-col gap-2 items-center justify-center">
            <LucideCalendar className="text-white size-16" />
            <span className="font-bold text-white text-sm md:text-lg">
              Fast Booking
            </span>
            <p className="text-white text-center">
              Quick, hassle-free, instant reservations.
            </p>
          </div>

          {/*item 3*/}
          <div className="bg-emerald-800/80 p-4 flex flex-col gap-2 items-center justify-center">
            <LucideDollarSign className="text-white size-16" />
            <span className="font-bold text-white text-sm md:text-lg">
              Competitive Pricing
            </span>
            <p className="text-white text-center">
              Affordable, value-driven, market-best prices.
            </p>
          </div>

          {/*Item 4*/}
          <div className="bg-primary p-4 flex flex-col gap-2 items-center justify-center">
            <LucideCircleQuestionMark className="text-white size-16" />
            <span className="font-bold text-white text-sm md:text-lg">
              24/7 Customer Support
            </span>
            <p className="text-white text-center">
              Reliable, always-on, expert assistance.
            </p>
          </div>
        </div>
        <div className="max-w-3xl flex flex-col gap-1 space-y-2">
          <div className="text-foreground text-xl md:text-3xl font-black">
            Why to choose Essence Treks Nepal?
          </div>
          <div className="text-base">
            We create seamless, personalized travel for explorers, culture
            enthusiasts, and adventure seekers. From weekend escapes to luxury
            cruises or bucket-list journeys, we handle every detail. Travel with
            ease, confidence, and a touch of wonder—wherever your dreams take
            you.
          </div>
          <Link href="/about-us">
            <Button className="w-fit rounded-xs font-bold">
              More about us <ChevronRight />
            </Button>
          </Link>
          <Separator className="my-4" />

          <div className="flex gap-4 justify-between">
            <div className="flex items-center justify-center flex-col gap-2 text-center">
              <LucideUsers className="text-primary size-8" />
              <p className="text-2xl">34.5K</p>
              <p>Happy Travelers</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex items-center justify-center flex-col gap-2 text-center">
              <LucideCheckCheck className="text-primary size-8" />
              <p className="text-2xl">24.6K</p>
              <p>Tour Success</p>
            </div>

            <Separator orientation="vertical" />
            <div className="flex items-center justify-center flex-col gap-2 text-center">
              <LucideStar className="text-primary size-8" />
              <p className="text-2xl">98.8%</p>
              <p>Positive Reviews</p>
            </div>
          </div>

          <Separator className="my-4" />
          <div className="flex flex-wrap gap-4 items-center">
            <TripAdvisorRatingBadge light />
            <Separator orientation="vertical" className="h-8" />
            <GoogleRatingBadge />
          </div>
        </div>
      </div>
    </div>
  );
}
