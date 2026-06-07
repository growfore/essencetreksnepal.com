import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import Link from "next/link";
import { LucideStar } from "lucide-react";

export default function GoogleRatingBadge({
  inverse,
}: {
  inverse?: boolean;
}) {
  return (
    <Link
      href="https://www.google.com/search?sca_esv=ae95eeef493796b7&sxsrf=ANbL-n7LBYQTXDVhf4DZYFqZtmmCtiS0eg:1773915236506&si=AL3DRZFIhG6pAqfNLal55wUTwygCG0fClF3UxiOmgw9Hq7nbWW69MEiZvU5e10x2mJ4gcivbI3k1hbjGYLhzGj-V2cm6KV2fnoNne5TGw9saosfyIF9gOofvJHEbem49cx5s80sWpCVz_pf71VEmfNsGGUuwCbhXOmvSVzLsX9eK7O-H8EYlWrd2P0NIYnI2YewziZckUBXc&q=Essence+Tours+and+Travels+%26+Treks+and+Expedition+Pvt.+LTD.+Reviews&sa=X&ved=2ahUKEwjYkKKc3auTAxV83TgGHYcrLMsQ0bkNegQIVRAH&biw=1462&bih=837&dpr=2"
      target="_blank"
    >
      <div className="flex gap-2 md:gap-4">
        <Image
          src={"/assets/googleicon.png"}
          width={32}
          height={100}
          alt=""
          className="object-contain h-auto w-auto size-5 md:size-8"
        />
        <div>
          <p className={`font-semibold text-xs md:text-base ${inverse ? "text-white" : "text-ink"}`}>Google</p>
          <div className={`flex gap-0.5 md:gap-1 items-center font-semibold text-[10px] md:text-xs ${inverse ? "text-white" : "text-ink"}`}>
            {Array.from({ length: 5 }).map((_, l) => (
              <LucideStar key={l} fill="orange" className="size-2.5 md:size-3" stroke="orange" />
            ))}
            Reviews {siteConfig.reviews.googleReview.rating}/5
          </div>
        </div>
      </div>
    </Link>
  );
}
