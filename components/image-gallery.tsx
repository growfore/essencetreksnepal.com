import Image from "next/image";
import { Button } from "./ui/button";
import { LucideImage } from "lucide-react";
import Lightbox from "@/components/claude/lightbox";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

export default function ImageGallery({
  images,
  keywords,
}: {
  images: string[];
  keywords: string[];
}) {
  const fullUrls = images.map(getFullImageUrl);
  const imageCount = fullUrls.length;

  if (imageCount === 0) return null;

  const rightImages =
    imageCount <= 3 ? fullUrls.slice(1) : fullUrls.slice(1, 5);

  const rightCount = rightImages.length;

  return (
    <div className="relative">
      <Lightbox images={fullUrls} imageAlts={keywords}>
        <div>
          <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 md:max-h-[80vh] overflow-hidden rounded-sm">
            <div className="md:col-span-2 overflow-hidden rounded-sm min-h-0">
              <Image
                data-lightbox-index={0}
                src={fullUrls[0]}
                alt={keywords[0] || "Image 1"}
                height={1280}
                width={1920}
                loading="eager"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {rightCount > 0 && (
              <>
                <div className="md:hidden flex flex-row gap-2 overflow-x-auto">
                  {rightImages.map((url, i) => (
                    <div
                      key={url}
                      className="overflow-hidden rounded-sm shrink-0 w-1/3 max-w-48"
                    >
                      <Image
                        data-lightbox-index={i + 1}
                        src={url}
                        alt={keywords[i + 1] || `Image ${i + 2}`}
                        height={1280}
                        width={1920}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
                <div className="hidden md:flex md:col-span-1 flex-col gap-2 overflow-hidden min-h-0">
                  {rightCount === 1 && (
                    <div className="flex-1 overflow-hidden rounded-sm min-h-0">
                      <Image
                        data-lightbox-index={1}
                        src={rightImages[0]}
                        alt={keywords[1] || "Image 2"}
                        height={1280}
                        width={1920}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  {rightCount === 2 &&
                    rightImages.map((url, i) => (
                      <div
                        key={url}
                        className="flex-1 overflow-hidden rounded-sm min-h-0"
                      >
                        <Image
                          data-lightbox-index={i + 1}
                          src={url}
                          alt={keywords[i + 1] || `Image ${i + 2}`}
                          height={1280}
                          width={1920}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ))}
                  {rightCount >= 3 && (
                    <>
                      <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden min-h-0">
                        {rightImages.slice(0, 2).map((url, i) => (
                          <div key={url} className="overflow-hidden rounded-sm">
                            <Image
                              data-lightbox-index={i + 1}
                              src={url}
                              alt={keywords[i + 1] || `Image ${i + 2}`}
                              height={1280}
                              width={1920}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 overflow-hidden rounded-sm min-h-0">
                        {rightCount === 3 ? (
                          <Image
                            data-lightbox-index={3}
                            src={rightImages[2]}
                            alt={keywords[3] || "Image 4"}
                            height={1280}
                            width={1920}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="grid grid-cols-2 gap-2 h-full">
                            {rightImages.slice(2).map((url, i) => (
                              <div
                                key={url}
                                className="overflow-hidden rounded-sm"
                              >
                                <Image
                                  data-lightbox-index={i + 3}
                                  src={url}
                                  alt={keywords[i + 3] || `Image ${i + 4}`}
                                  height={1280}
                                  width={1920}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <Button
              className="absolute top-4 left-4 opacity-45 font-black text-xs"
              variant={"secondary"}
            >
              <LucideImage /> {imageCount} Photo{imageCount > 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      </Lightbox>
    </div>
  );
}
