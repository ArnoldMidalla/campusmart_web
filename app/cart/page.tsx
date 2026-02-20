"use client";

import {
  Circle,
  CircleCheck,
  CircleMinus,
  CirclePlus,
  Trash2,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import CheckoutNav from "../components/checkoutNav";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import ProductCarousel from "../components/ProductCarousel";
import { products } from "../components/data";

export default function Cart() {
  const { cart, increaseQty, decreaseQty } = useCartStore();

  const [mounted, setMounted] = useState(false);

  const [leftCheck, setLeftCheck] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col gap-4 max-w-md w-full pb-28 pt-8">
        <div className="flex flex-col gap-2">
          <div className="px-5">
            <PageHeader title={`My Cart (${cart.length})`} />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        {/* empty */}
        {cart.length === 0 && (
          <p className="text-sm text-center">Your cart is empty</p>
        )}

        {/* items */}
        <div className="flex flex-col gap-4 px-5">
          {cart.map((item) => (
            <div
              className="flex flex-col gap-4"
              key={`${item.id}-${item.size}`}
            >
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="text-main"
                    onClick={() => setLeftCheck(!leftCheck)}
                  >
                    {leftCheck ? (
                      <CircleCheck size={19} fill="#ff681f" color="white" />
                    ) : (
                      <Circle size={19} />
                    )}
                  </button>

                  <div className="size-24 relative overflow-hidden rounded-sm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <p className="text-xs text-neutral-700">{item.category}</p>

                  <h1 className="font-medium text-sm leading-tight">
                    {item.name}
                  </h1>

                  {item.size && (
                    <p className="text-xs text-neutral-700">
                      Size: {item.size}
                    </p>
                  )}

                  <div className="flex justify-between items-end">
                    <p className="text-main text-lg font-bold">₦{item.price}</p>

                    <div className="w-21 px-2 h-7 rounded-full border-[1.9px] bg-white border-neutral-400 flex justify-between items-center">
                      <button onClick={() => decreaseQty(item.id, item.size)}>
                        {item.quantity === 1 ? (
                          <Trash2 size={15} color="#737373" strokeWidth={2.5} />
                        ) : (
                          <CircleMinus
                            size={15}
                            color="#737373"
                            strokeWidth={2.5}
                          />
                        )}
                      </button>

                      <p className="font-medium text-sm">{item.quantity}</p>

                      <button onClick={() => increaseQty(item.id, item.size)}>
                        <CirclePlus
                          size={15}
                          color="#737373"
                          strokeWidth={2.5}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-0.5 rounded-full bg-neutral-200" />
            </div>
          ))}
        </div>

        <section className="flex flex-col gap-3 bg-white py-1">
          <SectionHeader title="New in Stock" href="/new" />
          <ProductCarousel products={products} />
        </section>

        <section className="flex flex-col gap-3 bg-white py-1">
          <SectionHeader title="Favorites" href="/new" />
          <ProductCarousel products={products} hearted={true} />
        </section>
      </main>

      <CheckoutNav text="Checkout" link="checkout" />
    </div>
  );
}
