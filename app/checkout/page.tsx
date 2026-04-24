"use client";

import {
  ChevronRight,
  CircleMinus,
  CirclePlus,
  CreditCard,
  Landmark,
  Store,
  Trash2,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import CheckoutNav from "../components/checkoutNav";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import AppShell from "../components/AppShell";

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
    <>
      <AppShell noBottomPad>
        {/* Page header */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="px-5">
            <PageHeader title="Order confirmation" />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        {/* ── Two-column on lg+ ── */}
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-8 lg:items-start lg:px-6">

          {/* LEFT — Form content */}
          <div className="flex flex-col gap-6">

            {/* Items thumbnail row */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-5 lg:px-0">
                <p className="font-semibold">Items in your order ({cart.length})</p>
                <Link href="/cart" className="flex items-center">
                  <p className="text-xs text-black/70 tracking-normal">View all</p>
                  <ChevronRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
              <div className="flex gap-2 overflow-x-scroll px-5 lg:px-0 no-scrollbar">
                {cart.map((cartItem) => (
                  <div key={`${cartItem.id}-${cartItem.size}`} className="flex flex-col items-center">
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
                      <button onClick={() => decreaseQty(cartItem.id, cartItem.size)}>
                        {cartItem.quantity === 1 ? (
                          <Trash2 size={15} color="#737373" strokeWidth={2.5} />
                        ) : (
                          <CircleMinus size={15} color="#737373" strokeWidth={2.5} />
                        )}
                      </button>
                      <p className="font-medium text-sm">{cartItem.quantity}</p>
                      <button onClick={() => increaseQty(cartItem.id, cartItem.size)}>
                        <CirclePlus size={15} color="#737373" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-0.5 rounded-full bg-neutral-200" />

            {/* Shipping */}
            <div className="px-5 lg:px-0 flex flex-col gap-2">
              <p className="font-semibold">Shipping method</p>
              <div className="flex justify-between text-sm items-center">
                <div className="flex gap-1 items-center">
                  <Store size={17} color="#ff681f" />
                  <p className="text-black/70">Pick up station</p>
                </div>
                <Link href="/" className="text-blue-600 flex items-center">
                  <p className="text-sm">Select pick up station</p>
                  <ChevronRight size={14} strokeWidth={1.9} />
                </Link>
              </div>
            </div>

            <div className="w-full h-0.5 rounded-full bg-neutral-200" />

            {/* Payment */}
            <div className="px-5 lg:px-0 flex flex-col gap-2">
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
                        className="rounded-full border border-neutral-300 transition-all duration-200 size-3.5 mr-2"
                        style={{
                          backgroundColor: option.id === payMethod ? "#ff681f" : "transparent",
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
          </div>

          {/* RIGHT — Sticky order summary (desktop only) */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-8 bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-base">Order Summary</h2>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Cost of items</span>
                <span className="font-medium text-neutral-900">₦{totalPrice}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Coupon code</span>
                <input className="text-sm w-24 text-right border-b border-neutral-200 outline-none focus:border-main" placeholder="Enter here" />
              </div>
              <div className="h-px bg-neutral-100 my-1" />
              <div className="flex justify-between font-bold text-base">
                <span>Amount to Pay</span>
                <span className="text-main">₦{totalPrice}</span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              className="w-full py-3.5 rounded-2xl bg-main text-white font-semibold text-sm disabled:opacity-40 transition-all hover:brightness-105 active:scale-[0.98]"
            >
              Proceed to Pay →
            </button>
          </aside>
        </div>
      </AppShell>

      <CheckoutNav text="Proceed to Pay" link="" />
      <Nav />
    </>
  );
}
