import Image from "next/image";
import { Clock, Bus, Users, Star } from "lucide-react";

interface TourCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  transport: string;
  plan: string;
  rating: number;
  price: number;
}

export default function TourCard({
  title,
  description,
  image,
  duration,
  transport,
  plan,
  rating,
  price,
}: TourCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition max-w-sm">
      <div className="relative w-full h-80">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="text-base md:text-xl font-serif font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <Bus size={16} />
            <span>{transport}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{plan}</span>
          </div>

          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-500" />
            <span>{rating} / 5</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm md:text-lg font-bold text-gray-600">
            NPR {price.toLocaleString()}
            <span className="text-sm text-gray-500"> / person</span>
          </p>

          <button className="px-4 py-2 border border-blue-200 text-gray-500 font-semibold rounded-lg hover:bg-blue-200 duration-300 transition cursor-pointer">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
