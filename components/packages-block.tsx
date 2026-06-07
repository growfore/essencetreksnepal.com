"use client";
import { useRef } from "react";
import TripCard from "./card/trip-card";
import { Button } from "./ui/button";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

export default function PackagesBlock({
  packages,
}: {
  packages: any[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    scrollRef.current?.scrollBy({
      left: dir === "next" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <div className="my-8">
      <div className="relative">
        <Button
          onClick={() => scroll("prev")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-4 rounded-full cursor-pointer"
        >
          <LucideChevronLeft />
        </Button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-auto max-w-screen scrollbar-hide"
        >
          {packages?.map((pkg, index) => (
            <TripCard key={index} trip={pkg} />
          ))}
        </div>

        <Button
          onClick={() => scroll("next")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-4 rounded-full cursor-pointer"
        >
          <LucideChevronRight />
        </Button>
      </div>
    </div>
  );
}
