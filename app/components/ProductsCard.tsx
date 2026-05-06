"use client";

import { HeartPlus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavouritesStore } from "../store/useFavouritesStore";

interface ProductsCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
  id: number;
  hearted?: boolean;
  badge?: {
    text: string;
    color: string;
  };
}

export default function ProductsCard({
  name,
  price,
  category,
  image,
  id,
  // badge,
}: ProductsCardProps) {
  const { toggleFavourite, isFavourited } = useFavouritesStore();
  const isHearted = isFavourited(id);

  const handleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite({ id, name, price, image, category });
  };

  return (
    <Link href={`/productItem/` + id} className="flex justify-center w-38">
      <main className="w-full flex flex-col gap-2">
        <div className="relative overflow-hidden w-full h-28 md:w-full md:h-auto md:aspect-[4/3] rounded-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover w-full h-full"
          />
          {/* {badge && (
            <div
              className={`absolute top-2 right-2 ${badge.color} text-white text-xs font-semibold px-2 py-1 rounded-full`}
            >
              {badge.text}
            </div>
          )} */}
          <button
            onClick={handleHeart}
            className="absolute -bottom-1 -right-1 bg-white size-8 rounded-full text-main flex justify-center items-center shadow-lg border border-neutral-300"
          >
            {isHearted ? (
              <HeartPlus size={18} fill="#ff681f" color="white" />
            ) : (
              <HeartPlus size={18} />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-0.5 w-full">
          <p className="text-xs font-dmSans tracking-tight text-neutral-600">
            {category}
          </p>
          <p className="font-dmSans tracking-tight text-sm font-normal leading-3.5 line-clamp-1">
            {name}
          </p>
          <div className="flex-1 flex justify-between items-center">
            <p className="font-dmSans tracking-tight text-main font-semibold">
              N{price}
            </p>
            <ShoppingCart size={15} />
          </div>
        </div>
      </main>
    </Link>
  );
}
