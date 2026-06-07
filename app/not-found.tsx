import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        <h1 className="text-[12rem] md:text-[16rem] font-black text-primary leading-none">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this trek got lost in the mountains! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="size-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="gap-2">
              <Search className="size-5" />
              Explore Treks
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 bg-muted rounded-xl p-8 max-w-lg text-center">
        <h3 className="font-semibold text-base md:text-lg mb-2">Need help planning your trek?</h3>
        <p className="text-gray-600 mb-4">
          Our expert team is ready to help you find the perfect adventure.
        </p>
        <Link href="/booking">
          <Button variant="secondary" className="gap-2">
            <ArrowLeft className="size-4" />
            Start Planning
          </Button>
        </Link>
      </div>
    </div>
  );
}