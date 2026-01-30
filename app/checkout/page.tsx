"use client";

import {
  ChevronRight,
  CircleMinus,
  CirclePlus,
  CreditCard,
  Icon,
  Landmark,
  Store,
  Trash2,
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

  const [payMethod, setPayMethod] = useState<number>();

  const options = [
    { id: 1, title: "Add a card", Icon: CreditCard },
    { id: 2, title: "Bank Transfer", Icon: Landmark },
    { id: 3, title: "Opay" },
    { id: 4, title: "Palmpay" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col gap-4 max-w-md w-full pb-28 pt-8">
        <div className="flex flex-col gap-2">
          <div className="px-5">
            <PageHeader title="Order confirmation" />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        {/* items map over */}
        <div className="px-5 flex flex-col gap-2">
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
                <div className="relative overflow-hidden rounded-sm size-22">
                  <Image
                    src={cartItem.image}
                    alt={cartItem.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-main font-semibold text-sm tracking-normal">
                  N{cartItem.price}
                </p>
                <div className="w-20 px-2 h-6.5 rounded-full border bg-white border-neutral-500 flex justify-between items-center">
                  <button
                    onClick={() => decreaseQty(cartItem.id, cartItem.size)}
                  >
                    {cartItem.quantity === 1 ? (
                      <Trash2 size={15} color="#737373" strokeWidth={2.5} />
                    ) : (
                      <CircleMinus
                        size={15}
                        color="#737373"
                        strokeWidth={2.5}
                      />
                    )}
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

        <div className="w-full h-0.5 rounded-full bg-neutral-200" />

        <div className="px-5">
          <p className="font-semibold pb-2">Order summary</p>
          <div className="text-black/70 flex justify-between text-sm">
            <p>Cost of items</p>
            <p>N{totalPrice}</p>
          </div>
          <div className="text-black/70 flex justify-between text-sm">
            <p>Coupon codes</p>
            <input
              className="text-sm w-24 text-right"
              placeholder="Enter here"
            />
          </div>
          <div className="flex justify-between pt-3 text-sm">
            <p>Amount to Pay</p>
            <p>N{totalPrice}</p>
          </div>
        </div>

        <div className="w-full h-0.5 rounded-full bg-neutral-200" />

        <div className="px-5 flex flex-col gap-2">
          <p className="font-semibold">Shipping method</p>
          <div className="flex justify-between text-sm items-center">
            <div className="flex gap-1 items-center">
              <Store size={17} color="#ff681f" />
              <p className="text-black/70">Pick up station</p>
            </div>
            <Link href={"/"} className="text-blue-600 flex items-center">
              <p className="text-sm">Select pick up station</p>
              <ChevronRight size={14} strokeWidth={1.9} />
            </Link>
          </div>
        </div>

        <div className="w-full h-0.5 rounded-full bg-neutral-200" />

        <div className="px-5 flex flex-col gap-2">
          <p className="font-semibold">Payment choices</p>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                className="flex justify-between items-center"
                onClick={() => setPayMethod(option.id)}
              >
                <div className="flex gap-2 items-center">
                  <div
                    className="rounded-full border border-neutral-300 transition-all duration-200 size-4 mr-2"
                    style={{
                      backgroundColor:
                        option.id === payMethod ? "#ff681f" : "transparent",
                    }}
                  />
                  {option.Icon && (
                    <option.Icon color="#737373" size={17} strokeWidth={2.2} />
                  )}
                  <p className="text-sm text-black/70">{option.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
      <CheeckoutNav text="Proceed to Pay" link="" />
    </div>
  );
}
