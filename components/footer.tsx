import { siteConfig } from "@/lib/siteConfig";
import { LucideMail, LucideMap, LucidePhone } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import { getFooterItems } from "@/lib/api";

export default async function Footer() {
  const footerItems = await getFooterItems();

  const socials = [
    {
      name: "Facebook",
      url: siteConfig.socials.facebook,
      icon: <FaFacebook className="size-5" />,
    },
    {
      name: "YouTube",
      url: siteConfig.socials.youtube,
      icon: <FaYoutube className="size-5" />,
    },
    {
      name: "TikTok",
      url: siteConfig.socials.tiktok,
      icon: <FaTiktok className="size-5" />,
    },
  ];

  return (
    <footer className="bg-canvas border-t border-hairline">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerItems.data.items.map(
            (item: {
              url: string;
              label: string;
              children?: { url: string; label: string }[];
            }) => (
              <div key={item.url + item.label}>
                <Link href={item.url}>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-mute mb-4">
                    {item.label}
                  </h3>
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="space-y-2">
                    {item.children.map(
                      (subItem: { url: string; label: string }) => (
                        <li key={subItem.url + subItem.label}>
                          <Link
                            href={subItem.url}
                            className="text-sm text-body hover:text-ink transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            ),
          )}

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-mute mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-body">
              <div className="flex items-start gap-2">
                <LucideMap className="size-4 shrink-0 mt-0.5" />
                <span>{siteConfig.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <LucidePhone className="size-4 shrink-0" />
                <span>{siteConfig.phoneNumbers[0].phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideMail className="size-4" />
                <span className="break-all">{siteConfig.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social + Associations */}
      <div className="border-t border-hairline">
        <div className="container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs text-mute">Find us on</span>
            <div className="flex gap-3">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  className="text-body hover:text-ink transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-mute">Associated With</span>
            <div className="flex gap-3">
              {[
                "/associations/taan.avif",
                "/associations/nepal-government.avif",
                "/associations/nma.avif",
                "/associations/ntb.avif",
                "/associations/keep.avif",
              ].map((image, index) => (
                <Image
                  alt={`Association ${index + 1}`}
                  src={image}
                  height={24}
                  width={24}
                  key={index}
                  className="object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-hairline py-4 text-center text-xs text-mute">
        &copy; {siteConfig.name}. {siteConfig.established} &ndash;{" "}
        {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
}
