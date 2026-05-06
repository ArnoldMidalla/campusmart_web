"use client";

import {
  ChevronRight,
  CircleMinus,
  CirclePlus,
  CreditCard,
  Info,
  Landmark,
  Store,
  Trash2,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { usePickupStore } from "../store/usePickupStore";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import { useRouter } from "next/navigation";

// ── Payment logos from /public ────────────────────────────────────────────────

// ── Payment options config ─────────────────────────────────────────────────────
const options = [
  {
    id: 1,
    title: "Add a card",
    Icon: CreditCard,
    subLogos: (
      <div className="flex gap-1 items-center ml-1">
        <Image src="/Visa_Inc.png" alt="Visa" width={36} height={12} className="object-contain h-4 w-auto" />
        <Image src="/Mastercard.png" alt="Mastercard" width={32} height={20} className="object-contain h-5 w-auto" />
        <Image src="/Verve_Card.png" alt="Verve" width={40} height={16} className="object-contain h-4 w-auto" />
      </div>
    ),
  },
  { id: 2, title: "Bank Transfer", Icon: Landmark, rightLogo: null },
  { id: 3, title: "Opay", rightLogo: <Image src="/OPay.png" alt="OPay" width={52} height={20} className="object-contain h-6 w-auto" /> },
  { id: 4, title: "Palmpay", rightLogo: <Image src="/palmpay.png" alt="PalmPay" width={52} height={20} className="object-contain h-6 w-auto" /> },
];

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="w-full h-0.5 rounded-full bg-neutral-200" />;
}

export default function Checkout() {
  const router = useRouter();
  const { cart, increaseQty, decreaseQty } = useCartStore();
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const { selectedStation } = usePickupStore();
  const [mounted, setMounted] = useState(false);
  const [payMethod, setPayMethod] = useState<number>();
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);

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
          <Divider />
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
                  <div key={`${cartItem.id}-${cartItem.size}`} className="flex flex-col items-center gap-1">
                    {/* Thumbnail with optional stock badge */}
                    <div className="relative overflow-hidden rounded-sm size-22">
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fill
                        className="w-full h-full object-cover"
                      />
                      {/* Stock badge — shown when quantity is low (≤20). Real data would drive this. */}
                      {cartItem.quantity <= 2 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-main text-white text-[10px] font-semibold text-center py-0.5">
                          {cartItem.quantity * 10} Left
                        </div>
                      )}
                    </div>

                    <p className="text-main font-semibold text-sm tracking-normal">
                      ₦{cartItem.price.toLocaleString()}
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

            <Divider />

            {/* ── Order Summary (mobile/tablet — hidden on desktop; desktop uses aside) ── */}
            <div className="lg:hidden px-5 flex flex-col gap-2">
              <p className="font-semibold">Order summary</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-black/70">
                  <span>Cost of Items</span>
                  <span className="font-medium text-neutral-900">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-black/70 items-center">
                  <span>Coupon codes</span>
                  <button className="flex items-center text-black/70 gap-0.5">
                    <span className="text-sm">Enter here</span>
                    <ChevronRight size={14} strokeWidth={1.9} />
                  </button>
                </div>
                <Divider />
                <div className="flex justify-between font-bold text-base">
                  <span>Amount to Pay</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              <Divider />
            </div>

            {/* Shipping */}
            <div className="px-5 lg:px-0 flex flex-col gap-2">
              <p className="font-semibold">Shipping method</p>
              <div className="flex justify-between text-sm items-center gap-2">
                <div className="flex gap-1 items-center shrink-0">
                  <Store size={17} color="#ff681f" />
                  <p className="text-black/70">Pick-up Station</p>
                </div>
                <Link href="/pickup-station" className="text-blue-600 flex items-center gap-0.5 min-w-0">
                  <p className="text-sm truncate">
                    {selectedStation ? selectedStation.name : "Select a pickup station"}
                  </p>
                  <ChevronRight size={14} strokeWidth={1.9} className="shrink-0" />
                </Link>
              </div>
            </div>

            <Divider />

            {/* Payment */}
            <div className="px-5 lg:px-0 flex flex-col gap-3 pb-38">
              <p className="font-semibold">Payment choices</p>
              <div className="flex flex-col gap-3">
                {options.map((option) => (
                  <button
                    key={option.id}
                    className="flex justify-between items-center w-full"
                    onClick={() => setPayMethod(option.id)}
                  >
                    <div className="flex flex-col items-start gap-0.5">
                      <div className="flex gap-2 items-center">
                        {/* Radio indicator */}
                        <div
                          className="rounded-full border-2 border-neutral-300 transition-all duration-200 size-4 shrink-0 flex items-center justify-center"
                        >
                          {option.id === payMethod && (
                            <div className="size-2 rounded-full bg-main" />
                          )}
                        </div>
                        {option.Icon && (
                          <option.Icon color="#737373" size={17} strokeWidth={2.2} />
                        )}
                        <p className="text-sm text-black/70">{option.title}</p>
                      </div>
                      {/* Sub-logos (Visa/MC/Verve) below "Add a card" */}
                      {"subLogos" in option && option.subLogos && (
                        <div className="pl-8">{option.subLogos}</div>
                      )}
                    </div>

                    {/* Right-side logo (OPay, PalmPay) */}
                    {"rightLogo" in option && option.rightLogo && (
                      <div>{option.rightLogo}</div>
                    )}
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
                <span className="font-medium text-neutral-900">₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600 items-center">
                <span>Coupon code</span>
                <button className="flex items-center gap-0.5 text-black/70">
                  <span className="text-sm">Enter here</span>
                  <ChevronRight size={13} strokeWidth={1.9} />
                </button>
              </div>
              <div className="h-px bg-neutral-100 my-1" />
              <div className="flex justify-between font-bold text-base">
                <span>Amount to Pay</span>
                <span className="text-main">₦{totalPrice.toLocaleString()}</span>
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

      {/* ── Sticky bottom nav (mobile) ── */}
      <main className="fixed bottom-0 left-0 lg:left-60 xl:left-64 right-0 flex flex-col gap-2 items-center pb-6 font-dmSans tracking-tight z-50">
        <div className="backdrop-blur-xs flex justify-center items-center py-2 px-2 rounded-full border border-neutral-200 w-[80%] bg-white/30 max-w-sm gap-2">
          <p className="text-xs line-clamp-1">Items can only be returned within{" "}
            <span className="text-main font-semibold">24 hours</span>{" "}
            of picking-up</p>
        </div>
        <div className="backdrop-blur-xs flex justify-center items-center py-2 px-3 rounded-full border border-neutral-200 w-[88%] bg-white/30 max-w-sm gap-3">
          <p className="text-main font-bold text-base whitespace-nowrap shrink-0">
            ₦{totalPrice.toLocaleString()}
          </p>
          <button
            className="w-full h-10 rounded-full bg-main border border-transparent disabled:opacity-40 transition-all duration-300 hover:brightness-105 active:scale-[0.98]"
            onClick={() => router.push("/order-confirmation")}
            disabled={cart.length === 0}
          >
            <p className="font-medium text-sm text-white">
              Proceed to Pay ({totalQty})
            </p>
          </button>
        </div>
      </main>
    </>
  );
}
