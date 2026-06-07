import { TripData } from "@/app/types/trip-data";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LucideBookText,
  LucideChevronDown,
  LucideChevronUp,
  LucideCircle,
  LucideClock,
  LucideHandPlatter,
  LucideRulerDimensionLine,
  LucideTent,
} from "lucide-react";

interface TripItineraryProps {
  trip: TripData;
}

export function TripItinerary({ trip }: TripItineraryProps) {
  return (
    <div className="space-y-8 text-left">
      <div className="space-y-4">
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(trip.shortDescription),
          }}
        />
        <div
          id="highlights"
          className=" w-full
            prose-li:before:mask-[url('/icons/highlight.png')]
            prose-li:before:rotate-360
             "
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(trip.highlights[0]),
          }}
        />
        <div
          id="intro"
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(trip.fullDescription),
          }}
        />
      </div>
      <div id="itinerary" className="pb-4">
        <h2 className="font-bold flex gap-2 items-center">
          <LucideBookText className="size-8 text-primary" /> Detailed Itinerary
        </h2>
        <Accordion
          type="multiple"
          className="border-l-2 border-dashed border-primary px-4 py-0 my-0"
        >
          <div className="flex flex-col">
            {trip.itinerary.map((day, index) => (
              <AccordionItem
                key={index}
                value={index.toString()}
                className="not-prose relative border-none"
              >
                <LucideCircle className="absolute top-5.5 -ml-6.5  size-4 fill-white stroke-primary py-0! my-0!" />
                <AccordionTrigger
                  className="content-body font-bold text-base md:text-xl cursor-pointer flex items-center justify-between prose-h3:p-0 prose-h3:m-0  hover:no-underline border-b rounded-none

                  "
                >
                  <h3 className="flex items-center gap-4">{day.title}</h3>
                </AccordionTrigger>
                <AccordionContent
                  className="text-base md:text-xl pt-4
                  prose-base leading-loose
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h1:text-2xl md:prose-h1:text-3xl
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold
                  prose-h3:text-lg md:prose-h3:text-xl
                  prose-h4:text-base md:prose-h4:text-lg
                  prose-p:leading-normal prose-p:text-base md:prose-p:text-xl
                  prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary hover:prose-a:underline
                 prose-strong:text-black prose-strong:font-bold
                  prose-ul:my-2 prose-ol:my-2
                 prose-li:text-gray-700 prose-li:mb-1
                  prose-blockquote:border-l-4 prose-blockquote:border-primary/70 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-img:rounded-lg prose-img:my-6
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
                  prose-ul:list-none
                  prose-ol:list-none
                  prose-ol:before:content-none
                  prose-li:relative prose-li:pl-8 prose-li:text-base md:prose-li:text-xl
                  prose-li:before:absolute
                  prose-li:before:left-0
                  prose-li:before:top-[0.45em]
                  prose-li:before:w-4 prose-li:before:h-4
                  prose-li:before:mask-[url('/icons/highlight.png')]
                  prose-li:before:mask-contain
                  prose-li:before:mask-no-repeat
                  prose-li:before:bg-primary
                  prose max-w-none w-full
                 wrap-break-word
                  **:wrap-break-word
                  "
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeHtmlEntities(day.description),
                    }}
                  />

                  {(day?.duration ||
                    (day?.accommodations && day.accommodations?.length > 0) ||
                    day?.ascent ||
                    day?.descent ||
                    day?.distance ||
                    (day?.meals && day.meals?.length > 0)) && (
                    <div className="grid md:grid-cols-2 items-start gap-4 p-2 rounded-xs space-y-1.5 my-4 relative">
                      {day?.duration && (
                        <div className="flex gap-1 items-center">
                          <LucideClock className="h-6 w-6 shrink-0" />
                          {day.duration}
                        </div>
                      )}
                      {day?.distance && (
                        <div className="flex gap-1 items-start">
                          <LucideRulerDimensionLine
                            className={"mt-2 h-6 w-6 shrink-0"}
                          />
                          Distance: {day.distance}
                        </div>
                      )}
                      {day?.ascent && (
                        <div className="flex gap-1 items-start">
                          <LucideChevronUp className="text-green-500 mt-2 h-6 w-6 shrink-0" />
                          <div className="flex items-start  gap-1">
                            Ascent: {day.ascent}
                          </div>
                        </div>
                      )}
                      {day?.descent && (
                        <div className="flex gap-1 items-center">
                          <LucideChevronDown className="text-red-500 h-6 w-6 shrink-0" />
                          Descent: {day.descent}
                        </div>
                      )}
                      {day.accommodations && day.accommodations?.length > 0 && (
                        <div className="flex flex-col items-start gap-1">
                          <div className="gap-1 flex items-start">
                            <LucideTent className="mt-2 w-6 h-6 shrink-0" />
                            Accommodations: {day.accommodations.join(", ")}
                          </div>
                        </div>
                      )}
                      {day.meals && day.meals?.length > 0 && (
                        <div className="flex flex-col items-start gap-1">
                          <div className="gap-1 flex items-start">
                            <LucideHandPlatter className="mt-1 w-6 h-6 shrink-0" />
                            Meals: {day.meals.join(", ")}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
