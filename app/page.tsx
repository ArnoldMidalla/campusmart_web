"use client";

import { useState } from "react";
import { categories, products } from "./components/data";
import { Search } from "lucide-react";
import Link from "next/link";
import ProductsCard from "./components/ProductsCard";
import Nav from "./components/nav";

export default function Home() {
  const [pressed, setPressed] = useState(null);

  const handlePress = (name: any) => {
    setPressed((prev) => (prev === name ? null : name));
  };

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col max-w-md w-full pb-28">
        {/* section 1 */}
        <section className="flex flex-col gap-4 bg-white pt-12 pb-4 px-6">
          {/* search */}
          <div className="border border-neutral-200 shadow-lg/5 flex w-full h-12 rounded-full justify-between pl-4">
            <input
              type="search"
              placeholder="Search on Campusmart"
              className="text-sm font-medium w-full  focus:outline-none"
            />
            <button className="bg-main flex justify-center items-center px-4 rounded-full">
              <Search color="white" size={17} strokeWidth={3} />
            </button>
          </div>

          {/* categories */}
          <div className="flex justify-between">
            {categories.map((category) => {
              const isActive = pressed === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => handlePress(category.name)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`p-2 rounded-full border shadow-lg/5 transition-all duration-300
                    ${
                      isActive
                        ? "bg-main border-main text-white"
                        : "border-neutral-200 text-black"
                    }`}
                  >
                    <category.Icon size={20} />
                  </div>

                  <span className="text-xs font-medium ">{category.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="bg-neutral-100 w-full h-1" />

        {/* section 2 */}
        <section className="flex flex-col gap-2 bg-white py-4 px-6">
          <p className=" text-sm font-medium ">Featured</p>
          <div className="bg-neutral-300 rounded-lg w-full h-40"></div>
        </section>

        <div className="bg-neutral-100 w-full h-1" />

        {/*  */}
        <section className="flex flex-col gap-2 bg-white py-4">
          <div className="w-full flex justify-between px-6">
            <p className=" text-sm font-medium ">You Might Need</p>
            <Link href={"/"} className="text-main text-sm  ">
              See all
            </Link>
          </div>
          <div className="flex gap-4 px-6 overflow-x-scroll">
            {products.map((product) => (
              <ProductsCard
                key={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
                id={product.id}
              />
            ))}
          </div>
        </section>

        <div className="bg-neutral-100 w-full h-1" />

        {/*  */}
        <section className="flex flex-col gap-2 bg-white py-4">
          <div className="w-full flex justify-between px-6">
            <p className=" text-sm font-medium ">New in Stock</p>
            <Link href={"/"} className="text-main text-sm  ">
              See all
            </Link>
          </div>
          <div className="flex gap-4 px-6 overflow-x-scroll">
            {products.map((product) => (
              <ProductsCard
                key={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
                id={product.id}
              />
            ))}
          </div>
        </section>
      </main>
      <Nav />
    </div>
  );
}
