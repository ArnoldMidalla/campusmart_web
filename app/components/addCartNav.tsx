"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import { useCartStore } from "@/app/store/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomFloatingBar, { BottomFloatingBarContainer } from "./BottomFloatingBar";

export default function AddCartNav({
  product,
  selectedSize,
}: {
  product: { id: string | number; name: string; price: number; image: string; category: string; size: string[] };
  selectedSize?: string | null;
}) {
  const { addToCart, increaseQty, decreaseQty, getItemById } = useCartStore();
  const size = selectedSize ?? "default";

  const cartItem = getItemById(String(product.id), size);
  const quantity = cartItem?.quantity ?? 1;
  const isAdded = !!cartItem;

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <BottomFloatingBar>
      <BottomFloatingBarContainer>
        {!isAdded ? (
          <button
            disabled={!selectedSize && product.size.length > 1}
            className="w-full h-10 rounded-full bg-main disabled:opacity-60 border border-border-default transition-all duration-300"
            onClick={() =>
              addToCart({
                id: String(product.id),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                category: product.category,
                size,
              })
            }
          >
            <p className="font-medium text-sm text-white">
              {!selectedSize && product.size.length > 1
                ? "Select a size"
                : "Add to Cart"}
            </p>
          </button>
        ) : (
          <div className="w-full flex gap-4">
            <div className="w-28 px-2 h-10 rounded-full border bg-card border-main flex justify-between items-center">
              <button
                onClick={() => decreaseQty(String(product.id), size)}
                disabled={quantity <= 0}
              >
                <CircleMinus color="#ff681f" size={18} />
              </button>
              <p className="font-medium text-main">{quantity}</p>
              <button onClick={() => increaseQty(String(product.id), size)}>
                <CirclePlus color="#ff681f" size={18} />
              </button>
            </div>

            <button
              className="w-full h-10 rounded-full border bg-main border-border-default"
              onClick={() => router.push("/cart")}
            >
              <p className="font-medium text-sm text-white">View cart</p>
            </button>
          </div>
        )}
      </BottomFloatingBarContainer>
    </BottomFloatingBar>
  );
}
