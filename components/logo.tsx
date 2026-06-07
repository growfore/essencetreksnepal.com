import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image
        src={siteConfig.logo}
        alt="Essence Treks Nepal Logo"
        width={36}
        height={36}
        className="rounded-full object-cover"
      />
      <span className="font-semibold text-ink text-sm hidden sm:block">
        Essence Treks Nepal
      </span>
      <span className="font-semibold text-ink text-xs sm:hidden">
        Essence Treks
      </span>
    </Link>
  );
}
