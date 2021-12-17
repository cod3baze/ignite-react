import { memo } from "react";

type ProductItemProps = {
  product: { id: number; price: number; title: string; priceFormatted: number };
  onAddToWishList: (id: number) => void;
};

export function ProductItemComponent({
  product,
  onAddToWishList,
}: ProductItemProps) {
  return (
    <div>
      {product.title} - {product.priceFormatted}
      <button
        style={{ marginLeft: 10 }}
        type="button"
        onClick={() => onAddToWishList(product.id)}
      >
        Add to wishlist
      </button>
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
