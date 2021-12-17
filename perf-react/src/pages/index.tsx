import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

export type Results = {
  totalPrice: number;
  data: { id: number; price: number; title: string; priceFormatted: number }[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({} as Results);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => {
      return {
        id: product.id,
        price: product.price,
        title: product.title,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = results.data?.reduce(
      (total, product) => total + product.price,
      0
    );

    setResults({ data: products, totalPrice });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log("added: " + id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  );
}
