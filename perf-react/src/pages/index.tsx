import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<
    Array<{ id: number; price: number; title: string }>
  >([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
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

      <SearchResults results={results} onAddToWishList={addToWishList} />
    </div>
  );
}