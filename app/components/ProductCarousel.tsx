"use client";

import ProductsCard from "../components/ProductsCard";

type Props = {
  products: any[];
  hearted?: boolean;
};

export default function ProductCarousel({ products, hearted }: Props) {
  return (
    <div className="flex gap-3 px-4 overflow-x-scroll no-scrollbar">
      {products.map((product) => (
        <ProductsCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          image={product.image}
          id={product.id}
          badge={product.badge}
          hearted={hearted}
        />
      ))}
    </div>
  );
}
