import TestimonialCard from "./testimonial-card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import TripAdvisorRatingBadge from "./tripadvisor-rating-badge";
import GoogleRatingBadge from "./google-rating-badge";

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
}

export default async function Testimonials() {
  const res = await fetch(`${process.env.API_BASE_URL}/testimonial`, {
    cache: "force-cache",
  });
  const testimonials = await res.json();

  return (
    <section className="bg-canvas-soft py-16 md:py-24 relative overflow-hidden">
      {/* Decorative mesh */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 30%, #0070f3 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 90% 70%, #50e3c2 0%, transparent 60%)",
        }}
      />
      <div className="relative container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-mute mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold -tracking-[1.28px] text-ink mb-2">
            What Our Trekkers Say
          </h2>
          <p className="text-body text-base max-w-xl mx-auto">
            Read about the experiences of our trekkers who have explored the
            majestic Himalayas with us.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <TestimonialCard
              rating={testimonial.rating}
              key={testimonial.author + index}
              name={testimonial.author}
              review={testimonial.content}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-8 flex-wrap">
            <TripAdvisorRatingBadge light />
            <GoogleRatingBadge />
          </div>
          <Link href="/about-us">
            <Button variant="outline">
              More about us <ChevronRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
