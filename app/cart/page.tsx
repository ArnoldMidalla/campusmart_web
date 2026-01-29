"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import CheckoutNav from "../components/checkoutNav";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart, increaseQty, decreaseQty } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col gap-8 max-w-md w-full pb-28 px-6 pt-12">
        <PageHeader />

        {/* empty */}
        {cart.length === 0 && <p className="text-sm">Your cart is empty</p>}

        {/* items */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              className="flex flex-col gap-4"
              key={`${item.id}-${item.size}`}
            >
              <div className="flex gap-4 border rounded-md p-2">
                <div className="size-24 rounded-md border relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 py-2">
                  <p className="text-xs text-neutral-700">{item.category}</p>

                  <h1 className="font-medium text-sm leading-tight">
                    {item.name}
                  </h1>

                  {item.size && (
                    <p className="text-xs text-neutral-700">
                      Size: {item.size}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-main text-lg font-bold">₦{item.price}</p>

                    <div className="w-18 px-2 h-7 rounded-full border bg-white border-neutral-500 flex justify-between items-center">
                      <button onClick={() => decreaseQty(item.id, item.size)}>
                        <CircleMinus
                          size={15}
                          color="#737373"
                          strokeWidth={2.5}
                        />
                      </button>

                      <p className="font-medium">{item.quantity}</p>

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
              <div className="w-full h-0.5 rounded-full bg-neutral-300" />
            </div>
          ))}
        </div>
      </main>

      <CheckoutNav text="Checkout" link="checkout"/>
    </div>
  );
}
