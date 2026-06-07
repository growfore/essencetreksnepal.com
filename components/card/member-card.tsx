import Image from "next/image";
import { getFullImageUrl } from "@/lib/getFullImageUrl";
export interface TeamCardProps {
  image?: string;
  name: string;
  designation: string;
  description: string;
}

export default function TeamCard({
  image,
  name,
  designation,
  description,
}: TeamCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-canvas border border-hairline rounded-md p-6">
      <div className="size-32 shrink-0 rounded-full overflow-hidden bg-canvas-soft mx-auto md:mx-0">
        <Image
          src={image ? getFullImageUrl(image) : "/assets/everest.jpg"}
          width={128}
          height={128}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="space-y-2 text-center md:text-left">
        <h3 className="font-semibold text-ink">{name}</h3>
        <p className="text-sm text-mute">{designation}</p>
        <p className="text-sm text-body leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
