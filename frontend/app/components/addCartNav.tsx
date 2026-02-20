"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import { useCartStore } from "@/app/store/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddCartNav({ product, selectedSize }: any) {
  const { addToCart, increaseQty, decreaseQty, getItemById } = useCartStore();
  const size = selectedSize ?? "default";

  const cartItem = getItemById(product.id, size);
  const quantity = cartItem?.quantity ?? 1;
  const isAdded = !!cartItem;

  const router = useRouter();

    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="fixed bottom-0 left-0 w-dvw flex justify-center pb-6 font-dmSans tracking-tight z-50">
      <div className="backdrop-blur-xs flex justify-center items-center py-2 px-2 rounded-full border border-neutral-200 w-[80%] bg-white/30 max-w-sm">
        {!isAdded ? (
          <button
            disabled={!selectedSize && product.size.length > 1}
            className="w-full h-10 rounded-full bg-main disabled:opacity-60 border border-neutral-200 transition-all duration-300"
            onClick={() =>
              addToCart({
                id: product.id,
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
            <div className="w-28 px-2 h-10 rounded-full border bg-white border-main flex justify-between items-center">
              <button
                onClick={() => decreaseQty(product.id, size)}
                disabled={quantity <= 0}
              >
                <CircleMinus color="#ff681f" size={18} />
              </button>
              <p className="font-medium text-main">{quantity}</p>
              <button onClick={() => increaseQty(product.id, size)}>
                <CirclePlus color="#ff681f" size={18} />
              </button>
            </div>

            <button
              className="w-full h-10 rounded-full border bg-main border-neutral-200"
              onClick={() => router.push("/cart")}
            >
              <p className="font-medium text-sm text-white">View cart</p>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
