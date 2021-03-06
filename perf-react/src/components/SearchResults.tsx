import React from "react";
import { List, ListRowRenderer } from "react-virtualized";

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
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        width={900}
        rowHeight={30}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}
