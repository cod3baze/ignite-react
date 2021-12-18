import dynamic from "next/dynamic";
import lodash from "lodash";
import { memo, useState } from "react";

import { IAddProductToWishlistProps } from "./AddProductToWishlist";
// import { AddProductToWishlist } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<IAddProductToWishlistProps>(
  async () => {
    return import("./AddProductToWishlist").then(
      (module) => module.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

type ProductItemProps = {
  product: { id: number; price: number; title: string; priceFormatted: number };
  onAddToWishList: (id: number) => void;
};

export function ProductItemComponent({
  product,
  onAddToWishList,
}: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - {product.priceFormatted}
      <button type="button" onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
