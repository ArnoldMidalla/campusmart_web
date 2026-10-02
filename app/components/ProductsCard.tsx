"use client";

import { Heart, HeartPlus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFavouritesStore } from "../store/useFavouritesStore";

interface ProductsCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
  id: string;
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
  const router = useRouter();
  
  // Use precise selectors to avoid global re-renders
  const isHearted = useFavouritesStore((state) => 
    state.favourites.some(f => String(f.id) === String(id))
  );
  const toggleFavourite = useFavouritesStore((state) => state.toggleFavourite);

  const handleCardClick = () => {
    router.push(`/productItem/${id}`);
  };

  const handleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite({ id, name, price, image, category });
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="flex justify-center w-full cursor-pointer transition-all duration-150 active:scale-95 active:opacity-80"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <main className="w-full flex flex-col gap-2">
        <div className="relative overflow-hidden w-full h-28 rounded-lg">
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
          
          {/* Heart Button */}
          <button
            onClick={handleHeart}
            className="absolute -bottom-1 -right-1 bg-card size-8 rounded-full text-main flex justify-center items-center shadow-lg border border-border-default transition-all duration-150 active:scale-90"
          >
            {isHearted ? (
              <Heart size={18} fill="#ff681f" stroke="#ff681f" color="white" />
            ) : (
              <HeartPlus size={18} />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-0.5 w-full">
          <p className="text-xs font-dmSans tracking-tight text-foreground-muted">
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
    </div>
  );
}
