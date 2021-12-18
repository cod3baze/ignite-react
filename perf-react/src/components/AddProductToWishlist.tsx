import React from "react";

// exportar para o dynamic/lazy
export interface IAddProductToWishlistProps {
  onAddToWishlist: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishlist({
  onAddToWishlist,
  onRequestClose,
}: IAddProductToWishlistProps) {
  return (
    <span>
      deseja adicionar aos favoritos?
      <button onClick={onAddToWishlist} type="button">
        Sim
      </button>
      <button onClick={onRequestClose} type="button">
        Não
      </button>
    </span>
  );
}
