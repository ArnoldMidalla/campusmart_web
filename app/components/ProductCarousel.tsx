"use client";

import ProductsCard from "../components/ProductsCard";

type Props = {
  products: any[];
};

export default function ProductCarousel({ products }: Props) {
  return (
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
  );
}
