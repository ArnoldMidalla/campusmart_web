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
      <main className="pb-0 pt-8 md:ml-64">
        {/* ── Page header ── */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="px-5">
            <PageHeader title={`My Favourites (${favourites.length})`} />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        {/* ── Two-column on lg+ ── */}
        <div className="flex flex-col gap-8">

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

            <div className="flex flex-col gap-4 px-5">
              {Array.from(new Map(favourites.map(item => [String(item.id), item])).values()).map((item) => (
                <div className="flex flex-col gap-4" key={String(item.id)}>
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

        </div>
      </main>

      <Nav />
    </>
  );
}
