import { getFooterItems } from "@/lib/api";
import Link from "next/link";
import { LucideChevronRight } from "lucide-react";

type FooterItem = {
  url: string;
  label: string;
  children?: { url: string; label: string }[];
};

export default async function InfoSidebar() {
  const footerItems = await getFooterItems();
  const items: FooterItem[] = footerItems?.data?.items ?? [];

  const sidebarLinks = items.filter(
    (item) =>
      item.label.toLowerCase().includes("quick") ||
      item.label.toLowerCase().includes("info") ||
      item.label.toLowerCase().includes("page"),
  );

  const otherPages = sidebarLinks.length > 0 ? sidebarLinks : items;

  return (
    <aside className="hidden md:block">
      <div className="sticky top-32 space-y-6">
        <div className="border border-hairline rounded-lg p-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-mute mb-3">
            Related Pages
          </h3>
          <ul className="space-y-1">
            {otherPages.map((item) => (
              <li key={item.url}>
                {item.children && item.children.length > 0 ? (
                  <details className="group">
                    <summary className="flex items-center justify-between py-1 text-sm text-body hover:text-ink transition-colors cursor-pointer list-none">
                      <span>{item.label}</span>
                      <LucideChevronRight className="size-3 text-mute group-open:rotate-90 transition-transform" />
                    </summary>
                    <ul className="ml-3 mt-1 space-y-1 border-l border-hairline pl-3">
                      {item.children.map((child) => (
                        <li key={child.url}>
                          <Link
                            href={child.url}
                            className="block py-0.5 text-sm text-body hover:text-ink transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.url}
                    className="block py-1 text-sm text-body hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-hairline rounded-lg p-4 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-mute">
            Need Help?
          </h3>
          <Link
            href="/contact"
            className="block text-sm text-body hover:text-ink transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="block text-sm text-body hover:text-ink transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>
    </aside>
  );
}
