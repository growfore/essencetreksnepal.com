import HeroSearch from "@/components/hero-search";

export default function HomeHero() {
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
      {/*<Image
        src="/assets/home.jpg"
        alt="homeimg"
        fill
        className="object-cover"
        priority
      />*/}
      <video
        src={"/videos/hero-video.mp4"}
        autoPlay
        loop
        muted
        className="object-center object-cover h-[50vh] md:h-[70vh] w-full"
      />
      <div className="absolute inset-0 px-4 flex flex-col items-center justify-end md:justify-center bg-black/20 text-white">
        <div className="max-w-3xl flex flex-col justify-center space-y-2">
          <p className="text-lg md:text-2xl text-shadow-xs text-shadow-black font-mono text-white/80">
            Best treks in Nepal
          </p>
          <h1 className="uppercase font-black  text-2xl md:text-3xl lg:text-5xl mb-4 text-shadow-xs text-shadow-black">
            Essence Treks Nepal
          </h1>
          <HeroSearch />
        </div>
      </div>
    </div>
  );
}
