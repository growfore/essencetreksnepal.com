import ContactForm from "@/components/booking-form";
import { siteConfig } from "@/lib/siteConfig";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Plan Your Adventure - ${siteConfig.name}`,
  description:
    "Plan your Himalayan adventure with. Booking trekking, tours, and adventure sports in Nepal through our easy online inquiry form.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL + "/booking",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default async function BookingPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?page=1&limit=100`,
    { cache: "force-cache" },
  );

  const json = await res.json();

  const packages = json.data;

  const sortedPackages = [...packages].sort(
    (a: { title: string }, b: { title: string }) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );

  return <ContactForm packages={sortedPackages} />;
}
