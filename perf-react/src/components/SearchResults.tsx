import React from "react";
import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: number;
  }>;
  totalPrice: number;
  onAddToWishList: (id: number) => void;
};

export function SearchResults({
  results,
  totalPrice,
  onAddToWishList,
}: SearchResultsProps) {
  return (
    <div>
      <h2>{totalPrice}</h2>

      {results?.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  );
}
