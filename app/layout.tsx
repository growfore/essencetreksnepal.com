import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next";
import { montserrat, jetbrainsMono} from "@/lib/font";
import { siteConfig } from "@/lib/siteConfig";
import Footer from "@/components/footer";
import Cta from "@/components/cta";
import BackToTop from "@/components/back-to-top";
import FloatingWhatsAppIcon from "@/components/floating-whatsapp";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Essence Treks",
  description: "Created by Growfore Solution",
  openGraph: {
    siteName: siteConfig.name,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <TooltipProvider>
          <Navigation />
          <div className="pt-16 md:pt-[88px]">{children}</div>
          <Analytics />
          <Cta />
          <BackToTop />
          <Footer />
          <FloatingWhatsAppIcon />
        </TooltipProvider>
      </body>
    </html>
  );
}
