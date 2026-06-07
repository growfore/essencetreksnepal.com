"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { siteConfig } from "@/lib/siteConfig";
import Logo from "./logo";
import { BsWhatsapp } from "react-icons/bs";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
  parentId?: string | null;
  depth?: number;
};

const hasChildren = (item: MenuItem) =>
  Array.isArray(item.children) && item.children.length > 0;

const hasGrandchildren = (item: MenuItem) =>
  hasChildren(item) && item.children.some((c) => hasChildren(c));

function DesktopMenuItem({
  item,
  activeMega,
  onMegaOpen,
}: {
  item: MenuItem;
  activeMega: string | null;
  onMegaOpen: (id: string) => void;
}) {
  const isMega = hasGrandchildren(item);
  const isActive = activeMega === item.id;

  return (
    <li className="relative" onMouseEnter={() => isMega && onMegaOpen(item.id)}>
      <Link
        href={item.url || "#"}
        className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full transition-colors ${
          isActive
            ? "text-ink bg-canvas-soft"
            : "text-body hover:text-ink hover:bg-canvas-soft"
        }`}
      >
        {item.label}
        {hasChildren(item) && <ChevronDown size={14} className="text-mute" />}
      </Link>

      {hasChildren(item) && !isMega && isActive && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="bg-canvas border border-hairline rounded-lg shadow-[0px_2px_2px_#0000000a,0px_8px_16px_-4px_#0000000a] py-2 min-w-[200px]">
            {item.children.map((child) => (
              <Link
                key={child.id}
                href={child.url || "#"}
                className="block px-4 py-2 text-sm text-body hover:text-ink hover:bg-canvas-soft transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

interface MenuControllerProps {
  items: MenuItem[];
}

export function MenuController({ items }: MenuControllerProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const pathname = usePathname();
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const queueHide = useCallback(() => {
    cancelHide();
    hideTimer.current = setTimeout(() => setActiveMega(null), 200);
  }, [cancelHide]);

  const openMega = useCallback(
    (id: string) => {
      cancelHide();
      setActiveMega(id);
    },
    [cancelHide],
  );

  useEffect(() => {
    cancelHide();
    return cancelHide;
  }, [cancelHide]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveMega(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const activeItem = items.find((i) => i.id === activeMega) ?? null;
  const showMega = activeItem && hasGrandchildren(activeItem);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 bg-canvas border-b border-hairline transition-transform duration-300 ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="hidden md:block bg-canvas-soft border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="py-2 flex items-center justify-end gap-6 text-xs text-body">
            <Link
              href={`https://api.whatsapp.com/send/?phone=${siteConfig.whatsAppNumber}&type=phone_number&app_absent=0`}
              target="_blank"
              className="flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              <BsWhatsapp className="text-ink size-4" />
              {siteConfig.phoneNumbers[0].phone}
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              <Mail className="text-ink size-4" />
              info@essencetreksnepal.com
            </Link>
          </div>
        </div>
      </div>

      <div
        className="relative flex items-center justify-between h-16 mx-auto max-w-[1400px] px-4 md:px-8"
        onMouseLeave={queueHide}
      >
          <Logo />
          <div className="flex items-center gap-2 md:gap-4">
            <ul className="hidden md:flex items-center gap-1">
              {items.map((item) => (
                <DesktopMenuItem
                  key={item.id}
                  item={item}
                  activeMega={activeMega}
                  onMegaOpen={openMega}
                />
              ))}
            </ul>
            <Link href="/booking" className="hidden md:inline-flex">
              <Button>Book Now</Button>
            </Link>
            <MobileMenu
              items={items}
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </div>

          <div
            onMouseEnter={cancelHide}
            className={`absolute inset-x-0 top-0 z-40 ${
              showMega ? "block" : "hidden"
            }`}
          >
            <div className="h-16" aria-hidden="true" />
            {activeItem && hasGrandchildren(activeItem) && (
              <div className="bg-canvas border border-hairline rounded-lg shadow-[0px_2px_2px_#0000000a,0px_8px_16px_-4px_#0000000a] p-6">
                <div className="grid grid-cols-3 gap-6">
                  {activeItem.children.map((child) => (
                    <div key={child.id} className="flex flex-col">
                      {hasChildren(child) ? (
                        <>
                          <span className="block text-xs font-mono uppercase tracking-wider text-mute mb-3 shrink-0">
                            {child.label}
                          </span>
                          <div className="relative">
                            <ScrollArea type="always" className="h-60">
                              <ul className="space-y-1 pr-3">
                                {child.children.map((subChild) => (
                                  <li key={subChild.id}>
                                    <Link
                                      href={subChild.url || "#"}
                                      className="block py-1 text-sm text-body hover:text-ink transition-colors"
                                    >
                                      {subChild.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </ScrollArea>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={child.url || "#"}
                          className="block py-1 text-sm text-body hover:text-ink transition-colors"
                        >
                          {child.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
    </nav>
  );
}
