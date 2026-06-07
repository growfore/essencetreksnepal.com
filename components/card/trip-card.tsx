"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { LucideArrowRight, LucideClock, LucideGauge } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

export default function TripCard({ trip }: { trip: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="min-w-64 md:min-w-sm max-w-sm h-full"
    >
      <Link
        href={`/package/${trip.canonicalPath || trip.slug}`}
        className="group block bg-canvas border border-hairline rounded-md overflow-hidden shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a] hover:shadow-[0px_2px_2px_#0000000a,0px_8px_16px_-4px_#0000000a] transition-shadow h-full"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={trip.images?.[0] ? getFullImageUrl(trip.images[0]) : ""}
            alt={trip.keywords[0] || trip.title.split(/[:-]/)[0]}
            width={600}
            height={450}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-body">
              <LucideClock className="size-3.5" />
              {trip.duration}
            </div>
            <Badge className="text-xs bg-canvas-soft text-body border border-hairline rounded-full px-2.5 py-0.5 font-normal">
              <LucideGauge className="size-3 mr-1" />
              {trip.difficultyLevel}
            </Badge>
          </div>
          <h3 className="font-semibold text-ink leading-snug line-clamp-2">
            {trip.title.split(":")[0]}
          </h3>
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-sm text-body">From </span>
              <span className="text-lg font-semibold text-ink">
                ${trip.price}
              </span>
              <span className="text-xs text-body"> /person</span>
            </div>
            <Button size="sm" variant="ghost" className="shrink-0">
              Details <LucideArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
