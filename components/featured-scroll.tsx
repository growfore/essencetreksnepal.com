"use client";

import TripCard from "./card/trip-card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function FeaturedScroll({ activities }: { activities: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
      >
        {activities.map((activity: any) => (
          <TripCard key={activity.id} trip={activity} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <Button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          variant="outline"
          size="icon"
          className="disabled:opacity-30"
          aria-label="Previous"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          variant="outline"
          size="icon"
          className="disabled:opacity-30"
          aria-label="Next"
        >
          <ChevronRight />
        </Button>
        <Link href="/explore">
          <Button variant="outline">Explore all</Button>
        </Link>
      </div>
    </>
  );
}
