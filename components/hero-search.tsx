"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/explore?search=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex gap-2 items-center bg-canvas border border-hairline rounded-pill p-1.5 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
      <Input
        placeholder="Where are you going?"
        className="border-0 shadow-none h-10 bg-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button size="sm" className="shrink-0 rounded-full" onClick={handleSearch}>
        <SearchIcon className="size-4" />
        Search
      </Button>
    </div>
  );
}
