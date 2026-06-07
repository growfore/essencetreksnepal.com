import { Button } from "./ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-ink text-on-primary py-20 md:py-28 relative overflow-hidden">
      {/* Decorative mesh */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, #007cf0 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 50%, #ff0080 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 50%, #f9cb28 0%, transparent 60%)",
        }}
      />
      <div className="relative container mx-auto px-4 md:px-8 text-center max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold -tracking-[2px] leading-[1.05] mb-4">
          find your essence.
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-8">
          An invitation to experience the Himalayas through altitude and awe.
          Explore terrain, depth, and the quiet art of the mountains.
        </p>
        <Link href="/booking">
          <Button size="lg">
            Book Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
