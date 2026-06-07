import ContactForm from "@/components/contact-form";
import MapSection from "@/components/map-section";
import ContactInfo from "@/components/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Essence Treks - Get in Touch",
  description:
    "Contact Essence Treks for your Nepal trekking adventure. Reach us via phone, email, or WhatsApp. Located in Lakeside, Pokhara, Nepal.",
  keywords:
    "contact essence treks, Nepal trekking contact, Pokhara trekking agency, book Nepal trek, trekking inquiry",
  openGraph: {
    type: "website",
    url: "https://essencetreks.com/contact",
    title: "Contact Us | Essence Treks",
    description:
      "Get in touch with Essence Treks for your Himalayan adventure. We're here to help plan your perfect Nepal trekking experience.",
    images: [
      {
        url: "https://essencetreks.com/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Essence Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Essence Treks",
    description:
      "Get in touch with Essence Treks for your Himalayan adventure. We're here to help plan your perfect Nepal trekking experience.",
    images: ["https://essencetreks.com/contact-og.jpg"],
  },
  alternates: {
    canonical: "https://essencetreks.com/contact",
  },
};

const ContactPage = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-wider text-mute mb-3">
            Get in Touch
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold -tracking-[1.6px] text-ink mb-4">
            Contact Us.
          </h1>
          <p className="text-body text-base max-w-xl mx-auto">
            Fill out the form below and we&apos;ll receive your message directly
            on WhatsApp!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>

        <MapSection />
      </div>
    </div>
  );
};

export default ContactPage;
