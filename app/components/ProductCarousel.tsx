"use client";

import ProductsCard from "../components/ProductsCard";

type Props = {
  products: any[];
  hearted?: boolean;
};

export default function ProductCarousel({ products, hearted }: Props) {
  return (
    <div className="flex gap-3 sm:gap-4 px-4 sm:px-6 overflow-x-scroll no-scrollbar">
      {products.map((product) => (
        <div key={product.id} className="shrink-0 w-38 sm:w-44 md:w-56">
          <ProductsCard
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
            id={String(product.id)}
            badge={product.badge}
            hearted={hearted}
          />
        </div>
      ))}
    </div>
  );
}

