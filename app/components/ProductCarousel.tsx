"use client";

import ProductsCard from "../components/ProductsCard";

type Props = {
  products: any[];
  hearted?: boolean;
};

export default function ProductCarousel({ products, hearted }: Props) {
  return (
    <div className="flex gap-3 md:gap-6 px-4 md:px-8 overflow-x-scroll no-scrollbar">
      {products.map((product) => (
        <div key={product.id} className="shrink-0">
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

