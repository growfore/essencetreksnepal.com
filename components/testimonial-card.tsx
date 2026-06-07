"use client";

import { useState } from "react";
import { LucideStar } from "lucide-react";

export default function TestimonialCard({
  name,
  review,
  rating,
}: {
  name: string;
  review: string;
  rating: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const stars = Array.from({ length: rating });
  const needsTruncation = review.length > 150;

  return (
    <div className="min-w-sm max-w-sm">
      <div className="bg-canvas border border-hairline rounded-md p-5 space-y-3 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
        <div className="flex gap-0.5">
          {stars.map((_, index) => (
            <LucideStar
              key={index}
              fill="#0070f3"
              className="text-link size-4"
            />
          ))}
        </div>
        <div>
          <p
            className={`text-sm text-body leading-relaxed ${
              !expanded ? "line-clamp-5" : ""
            }`}
          >
            {review}
          </p>
          {needsTruncation && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-link hover:underline mt-1"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 pt-1">
          <div className="size-10 rounded-full bg-canvas-soft flex items-center justify-center text-ink font-semibold text-sm shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <p className="font-medium text-ink text-sm">{name}</p>
        </div>
      </div>
    </div>
  );
}
