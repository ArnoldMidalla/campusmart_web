"use client";

import ProductsCard from "../components/ProductsCard";

type Props = {
  products: any[];
  hearted?: boolean;
};

export default function ProductCarousel({ products, hearted }: Props) {
  return (
    <div className="flex gap-3 px-4 overflow-x-scroll no-scrollbar md:overflow-x-visible md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4">
      {products.map((product) => (
        <div key={product.id} className="shrink-0 md:shrink md:w-auto">
          <ProductsCard
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
            id={product.id}
            badge={product.badge}
            hearted={hearted}
          />
        </div>
      ))}
    </div>
  );
}

