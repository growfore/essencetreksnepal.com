"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import GoogleRatingBadge from "../google-rating-badge";

const OldHeroSection = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const bannerImages = [
    "/images/banner1.webp",
    "/images/banner2.webp",
    "/images/banner3.webp",
    "/images/banner4.jpeg",
    "/images/banner5.jpg",
    "/images/banner6.webp",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-canvas">
      {/* Gradient sides */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20" />
      <div className="hidden md:block absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-20" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50 z-10" />

      <motion.div
        key={currentBanner}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={bannerImages[currentBanner]}
          alt="Majestic Himalayas"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="relative z-30 flex flex-col items-start justify-center h-full px-4 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="mb-6">
            <GoogleRatingBadge inverse />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] -tracking-[2.4px] text-white mb-4 max-w-3xl">
            Discover Nepal&apos;s Hidden Treasures.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10">
            Experience the magic of the Himalayas with our expert guides and
            unforgettable adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/booking">
              <Button size="lg">Start Your Adventure</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentBanner === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OldHeroSection;
