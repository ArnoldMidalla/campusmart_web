"use client";

import {
  ChevronRight,
  CircleMinus,
  CirclePlus,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import CheeckoutNav from "../components/checkoutNav";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart, increaseQty, decreaseQty } = useCartStore();
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col gap-8 max-w-md w-full pb-28 px-6 pt-12">
        <PageHeader />

        {/* items map over */}
        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Items in your order({cart.length})</p>
            <Link href={"/cart"} className="flex items-center">
              <p className="text-xs text-black/70 tracking-normal">View all</p>
              <ChevronRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="flex gap-2">
            {cart.map((cartItem) => (
              <div
                key={`${cartItem.id}-${cartItem.size}`}
                className="flex flex-col items-center"
              >
                <div className="relative overflow-hidden rounded-lg size-24">
                  <Image
                    src={cartItem.image}
                    alt={cartItem.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-main font-semibold text-sm tracking-normal">
                  {cartItem.price}
                </p>
                <div className="w-18 px-2 h-7 rounded-full border bg-white border-neutral-500 flex justify-between items-center">
                  <button
                    onClick={() => decreaseQty(cartItem.id, cartItem.size)}
                  >
                    <CircleMinus size={15} color="#737373" strokeWidth={2.5} />
                  </button>

                  <p className="font-medium text-sm">{cartItem.quantity}</p>

                  <button
                    onClick={() => increaseQty(cartItem.id, cartItem.size)}
                  >
                    <CirclePlus size={15} color="#737373" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold">Order summary</p>
          <div className="text-black/70 flex justify-between text-sm">
            <p>Cost of items</p>
            <p>N{totalPrice}</p>
          </div>
          <div className="text-black/70 flex justify-between text-sm">
            <p>Coupon codes</p>
            {/* <p>N{totalPrice}</p> */}
          </div>
          <div className="flex justify-between">
            <p>Amount to Pay</p>
            <p>N{totalPrice}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Shipping method</p>
        </div>
      </main>
      <CheeckoutNav text="Proceed to Pay" link="" />
    </div>
  );
}
