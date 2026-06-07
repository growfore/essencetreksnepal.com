"use client";
import {
  LucideCheck,
  LucideCircleQuestionMark,
  LucideInfo,
  LucideMap,
  LucideMapPin,
  LucideStar,
  LucideWallpaper,
  LucideX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "overview", label: "Overview", icon: <LucideWallpaper /> },
  { id: "highlights", label: "Highlights", icon: <LucideStar /> },
  { id: "itinerary", label: "Itinerary", icon: <LucideMapPin /> },
  { id: "map", label: "Map", icon: <LucideMap /> },
  { id: "inclusions", label: "Includes", icon: <LucideCheck /> },
  { id: "exclusions", label: "Excludes", icon: <LucideX /> },
  { id: "trip-info", label: "Trip Info", icon: <LucideInfo /> },
  { id: "faqs", label: "Faqs", icon: <LucideCircleQuestionMark /> },
];

export function SectionNavigation() {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [mainNavHidden, setMainNavHidden] = useState(true);
  const [overviewPast, setOverviewPast] = useState(false);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setMainNavHidden(true);
      } else {
        setMainNavHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("overview");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverviewPast(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const btn = buttonRefs.current[activeSection];
    const container = navScrollRef.current;
    if (!btn || !container) return;

    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const containerWidth = container.offsetWidth;

    const targetScroll = btnLeft - containerWidth / 2 + btnWidth / 2;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeSection]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const showNav = mainNavHidden && overviewPast;

  if (!showNav) return null;

  return (
    <nav className="sticky top-0 z-40 bg-canvas border-b border-hairline">
      <div className="container mx-auto px-4">
        <div
          ref={navScrollRef}
          className="flex gap-1 overflow-x-auto scrollbar-hide py-2"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              ref={(el) => {
                buttonRefs.current[section.id] = el;
              }}
              onClick={() => handleNavClick(section.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap rounded-full transition-colors ${
                activeSection === section.id
                  ? "bg-ink text-on-primary"
                  : "text-body hover:text-ink hover:bg-canvas-soft"
              }`}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
