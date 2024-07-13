"use client";

import { Product } from "./products.api";
import { useRouter } from "next/navigation";

export function ProductCard(product: Product) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/products/${product.guid}`);
      }}
      key={product.guid}
      className="border border-gray-800 bg-gray-950 rounded-md w-full p-3 hover:bg-gray-900 hover:cursor-pointer"
    >
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.guid}</p>
    </div>
  );
}
