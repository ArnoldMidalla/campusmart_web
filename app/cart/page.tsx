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
import Nav from "../components/nav";
import AppShell from "../components/AppShell";

export default function Cart() {
  const { cart, increaseQty, decreaseQty } = useCartStore();
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const [mounted, setMounted] = useState(false);
  const [leftCheck, setLeftCheck] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AppShell noBottomPad>
        {/* ── Page header ── */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="px-5">
            <PageHeader title={`My Cart (${cart.length})`} />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        {/* ── Two-column on lg+ ── */}
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-8 lg:items-start lg:px-6">

          {/* LEFT — Cart items */}
          <div className="flex flex-col gap-4">
            {cart.length === 0 && (
              <p className="text-sm text-center px-5">Your cart is empty</p>
            )}

            <div className="flex flex-col gap-4 px-5 lg:px-0">
              {cart.map((item) => (
                <div className="flex flex-col gap-4" key={`${item.id}-${item.size}`}>
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
                      <h2 className="font-medium text-sm leading-tight">{item.name}</h2>

                      {item.size && (
                        <p className="text-xs text-neutral-700">Size: {item.size}</p>
                      )}

                      <div className="flex justify-between items-end">
                        <p className="text-main text-lg font-bold">₦{item.price}</p>

                        <div className="w-21 px-2 h-7 rounded-full border-[1.9px] bg-white border-neutral-400 flex justify-between items-center">
                          <button onClick={() => decreaseQty(item.id, item.size)}>
                            {item.quantity === 1 ? (
                              <Trash2 size={15} color="#737373" strokeWidth={2.5} />
                            ) : (
                              <CircleMinus size={15} color="#737373" strokeWidth={2.5} />
                            )}
                          </button>
                          <p className="font-medium text-sm">{item.quantity}</p>
                          <button onClick={() => increaseQty(item.id, item.size)}>
                            <CirclePlus size={15} color="#737373" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-0.5 rounded-full bg-neutral-200" />
                </div>
              ))}
            </div>

            {/* Suggestions — full-width inside the left column */}
            <section className="flex flex-col gap-3 bg-white py-1">
              <SectionHeader title="New in Stock" href="/new" />
              <ProductCarousel products={products} />
            </section>

            <section className="flex flex-col gap-3 bg-white py-1">
              <SectionHeader title="Favorites" href="/new" />
              <ProductCarousel products={products} hearted={true} />
            </section>
          </div>

          {/* RIGHT — Order summary (visible on lg+, hidden on mobile — handled by CheckoutNav) */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-8 bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-base">Order Summary</h2>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal ({cart.length} item{cart.length !== 1 ? "s" : ""})</span>
                <span className="font-medium text-neutral-900">₦{totalPrice}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="h-px bg-neutral-100 my-1" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-main">₦{totalPrice}</span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              className="w-full py-3.5 rounded-2xl bg-main text-white font-semibold text-sm disabled:opacity-40 transition-all hover:brightness-105 active:scale-[0.98]"
            >
              Proceed to Checkout →
            </button>

            <p className="text-xs text-neutral-400 text-center">
              Secure checkout powered by CampusMart
            </p>
          </aside>
        </div>
      </AppShell>

      {/* Mobile sticky nav — hidden on lg via lg:hidden inside CheckoutNav */}
      <CheckoutNav text="Checkout" link="checkout" />
      {/* <Nav /> */}
    </>
  );
}
