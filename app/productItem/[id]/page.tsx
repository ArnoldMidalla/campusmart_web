"use client";

import AddCartNav from "@/app/components/addCartNav";
import { products } from "@/app/components/data";
import {
  BadgeCheck,
  ChevronRight,
  HeartPlus,
  RulerDimensionLine,
  Search,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductsCard from "@/app/components/ProductsCard";
import PageHeader from "@/app/components/PageHeader";

import { useCartStore } from "@/app/store/useCartStore";

export default function ProductItem() {
  const params = useParams();
  const { id } = params;
  console.log(id);
  const router = useRouter();

  const [pressed, setPressed] = useState(null);

  const handlePress = (name: any) => {
    setPressed((prev) => (prev === name ? null : name));
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const product = products.find((p) => p.id == Number(id));

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (product) {
    const rightItems = (
      <div className="flex gap-3">
        <button
          onClick={() => router.push("/search")}
          className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition"
        >
          <Search size={16} />
        </button>
        <button
          onClick={() => router.push("/")}
          className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition"
        >
          <Share2 size={16} />
        </button>
        <button
          onClick={() => router.push("/")}
          className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition"
        >
          <HeartPlus size={16} />
        </button>
      </div>
    );

    return (
      <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
        <main className="flex flex-col gap-2 max-w-md w-full pb-28">
          <div className="fixed top-0 z-50 pt-8 px-6 pb-2 w-full">
            <PageHeader rightItems={rightItems} />
          </div>

          <div className="w-full h-[50vh] relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 px-6 pt-6">
            <p className="text-black/50 text-sm leading-4">
              {product.productDetails}
            </p>
            <div className="flex gap-2 text-sm text-neutral-600">
              <div className="flex gap-0.5 items-center">
                <Star fill="#ff681f" color="#ff681f" size={14} />
                <p>{product.avgRating}</p>
              </div>
              <div className="h-5 rounded w-0.5 bg-neutral-200" />
              <p>{product.noOfRatings} ratings</p>
              <div className="h-5 rounded w-0.5 bg-neutral-200" />
              <p>{product.noOfReview} reviews</p>
            </div>
            <p className="text-main text-xl font-bold">N{product.price}</p>

            {/* product size section */}
            {product.size.length > 1 ? (
              <section className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Select size</p>
                  <div className="opacity-70 flex gap-1 items-center">
                    <RulerDimensionLine size={15} />{" "}
                    <p className="text-xs">Size guide</p>
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {product.size.map((size) => {
                    const isActive = pressed === size;

                    return (
                      <button
                        key={size}
                        onClick={() => handlePress(size)}
                        className={`flex justify-center items-center size-8 rounded-md border border-neutral-200 shadow-md/5 transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-950 border-main text-white"
                          : "bg-white text-black"
                      }`}
                      >
                        <p className="text-xs font-medium tracking-tight">
                          {size}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : (
              <section className="">
                <p className="text-sm">Available Size</p>
                <p className="text-sm font-medium">{product.size}</p>
              </section>
            )}

            {/* reviews */}
            <div className="w-full flex justify-between mt-4">
              <p className="text-sm font-medium ">Reviews</p>
              <Link href={"/"} className="text-main text-sm  ">
                See all
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {product.reviews.map((review) => (
                <div
                  className="p-4 rounded-xl border border-neutral-200 flex flex-col gap-2"
                  key={review.id}
                >
                  <div className="flex justify-between text-xs opacity-70 items-center">
                    <div className="flex gap-2">
                      <p>{review.nameOfReviewer}</p>
                      <p>{review.timeAgo} hours ago</p>
                      <p>{review.rating} rating</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-1 items-center">
                        <ThumbsUp size={16} />
                        <p>{`(${review.ratingUpvotes})`}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <ThumbsDown size={16} />
                        <p>{`(${review.ratingDownvotes})`}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-3.5">
                    {review.actualReview}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-between mt-4">
              <p className="text-sm font-medium ">Seller Info</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="size-7 rounded-full bg-neutral-500"></div>
                <div>
                  <div className="flex gap-1.5 items-center">
                    <p className="text-sm font-medium">{product.sellerName}</p>
                    {product.sellerVerified && (
                      <BadgeCheck color="#ff681f" strokeWidth={3} size={16} />
                    )}
                  </div>
                  <div className="flex gap-1.5 text-xs text-black/70 items-center">
                    <p>{product.sellerSold}</p>
                    <div className="h-3.5 rounded w-0.5 bg-neutral-200" />
                    <p>{product.sellerRating}</p>
                  </div>
                </div>
              </div>
              <Link
                href={"/"}
                className="size-8 border border-neutral-200 shadow-lg/10 rounded-full flex justify-center items-center"
              >
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Key Features */}
            <div className="w-full flex justify-between mt-4">
              <p className="text-sm font-medium ">Key Features</p>
            </div>
            <p className="text-black/70 text-sm">{product.keyFeatures}</p>

            <div className="w-full flex justify-between mt-4">
              <p className="text-sm font-medium ">Best Picks</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {products.map((productsMap) => (
                <ProductsCard
                  category={productsMap.category}
                  image={productsMap.image}
                  price={productsMap.price}
                  name={productsMap.name}
                  key={productsMap.id}
                  id={productsMap.id}
                />
              ))}
            </div>
          </div>
        </main>

        <AddCartNav product={product} selectedSize={pressed} />
      </div>
    );
  } else {
  }
}
