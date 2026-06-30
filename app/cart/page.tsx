"use client";

import {
  Circle,
  CircleCheck,
  CircleMinus,
  CirclePlus,
  Trash2,
  Heart,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useFavouritesStore } from "../store/useFavouritesStore";
import Image from "next/image";
import CheckoutNav from "../components/checkoutNav";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import ProductCarousel from "../components/ProductCarousel";
import { products } from "../components/data";
import Nav from "../components/nav";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartStore();
  const { addFavourite } = useFavouritesStore();
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const [mounted, setMounted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelection = (key: string) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setSelectedItems(newSet);
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((key) => {
      const [idStr, size] = key.split('|');
      removeFromCart(Number(idStr), size);
    });
    setSelectedItems(new Set());
  };

  const handleFavoriteSelected = () => {
    selectedItems.forEach((key) => {
      const [idStr, size] = key.split('|');
      const id = Number(idStr);
      const item = cart.find((i) => i.id === id && i.size === size);
      if (item) {
        addFavourite({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
        });
      }
    });
    setSelectedItems(new Set());
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <main className="pb-28 pt-8 md:ml-64">
        {/* ── Page header ── */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12">
            <PageHeader 
              title={`My Cart (${cart.length})`}
              rightItems={
                selectedItems.size > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFavoriteSelected}
                      className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition shrink-0"
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      onClick={handleDeleteSelected}
                      className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : undefined
              }
            />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:px-8 lg:px-12 md:items-start md:pt-4">

          {/* LEFT — Cart items */}
          <div className="flex flex-col gap-4 md:w-2/3">
            {cart.length === 0 && (
              <p className="text-sm text-center px-4 sm:px-6 md:px-0">Your cart is empty</p>
            )}

            <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-0">
              {cart.map((item) => (
                <div className="flex flex-col gap-4" key={`${item.id}-${item.size}`}>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-main"
                        onClick={() => toggleSelection(`${item.id}|${item.size}`)}
                      >
                        {selectedItems.has(`${item.id}|${item.size}`) ? (
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

          {/* RIGHT - Summary */}
          <div className="w-full md:w-1/3 md:sticky md:top-8 mt-4 md:mt-0">
            <CheckoutNav text="Checkout" link="checkout" />
          </div>

        </div>
      </main>

      {/* <Nav /> */}
    </>
  );
}
