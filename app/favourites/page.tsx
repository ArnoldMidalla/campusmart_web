"use client";

import { Trash2 } from "lucide-react";
import { useFavouritesStore } from "../store/useFavouritesStore";
import Image from "next/image";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import ProductCarousel from "../components/ProductCarousel";
import { products } from "../components/data";
import Nav from "../components/nav";
import AppShell from "../components/AppShell";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Favourites() {
  const { favourites, removeFavourite } = useFavouritesStore();

  const [mounted, setMounted] = useState(false);

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
            <PageHeader title={`My Favourites (${favourites.length})`} />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        {/* ── Two-column on lg+ ── */}
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-8 lg:items-start lg:px-6">

          {/* LEFT — Favourite items */}
          <div className="flex flex-col gap-4">
            {favourites.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-16 px-5">
                <div className="size-20 rounded-full bg-orange-50 flex items-center justify-center">
                  <Heart size={36} className="text-main" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-neutral-800">No favourites yet</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Heart items you love and they&apos;ll appear here.
                  </p>
                </div>
                <Link
                  href="/"
                  className="mt-2 px-6 py-2.5 rounded-full bg-main text-white text-sm font-semibold hover:brightness-105 transition"
                >
                  Explore Products
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-4 px-5 lg:px-0">
              {favourites.map((item) => (
                <div className="flex flex-col gap-4" key={item.id}>
                  <div className="flex gap-4">
                    <Link
                      href={`/productItem/${item.id}`}
                      className="size-24 relative overflow-hidden rounded-sm shrink-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-xs text-neutral-700">{item.category}</p>
                        <Link href={`/productItem/${item.id}`}>
                          <h2 className="font-medium text-sm leading-tight hover:text-main transition-colors">
                            {item.name}
                          </h2>
                        </Link>
                      </div>

                      <div className="flex justify-between items-end">
                        <p className="text-main text-lg font-bold">₦{item.price}</p>

                        <button
                          onClick={() => removeFavourite(item.id)}
                          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} strokeWidth={2} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-0.5 rounded-full bg-neutral-200" />
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <section className="flex flex-col gap-3 bg-white py-1">
              <SectionHeader title="New in Stock" href="/new" />
              <ProductCarousel products={products} />
            </section>
          </div>

          {/* RIGHT — Summary panel (visible on lg+) */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-8 bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-base">Favourites Summary</h2>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>
                  Saved item{favourites.length !== 1 ? "s" : ""} ({favourites.length})
                </span>
                <span className="font-medium text-neutral-900">
                  ₦{favourites.reduce((t, f) => t + f.price, 0).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-neutral-100 my-1" />
              <div className="flex justify-between font-bold text-base">
                <span>Total value</span>
                <span className="text-main">
                  ₦{favourites.reduce((t, f) => t + f.price, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href="/cart"
              className={`w-full py-3.5 rounded-2xl text-center font-semibold text-sm transition-all hover:brightness-105 active:scale-[0.98] ${
                favourites.length === 0
                  ? "bg-neutral-100 text-neutral-400 pointer-events-none"
                  : "bg-main text-white"
              }`}
            >
              Add All to Cart →
            </Link>

            <p className="text-xs text-neutral-400 text-center">
              Items saved for later on CampusMart
            </p>
          </aside>
        </div>
      </AppShell>

      <Nav />
    </>
  );
}
