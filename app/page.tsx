"use client";

import { useState } from "react";

import { Gif } from "@/types/gif";
import SearchBar from "./components/Searchbar";
import GifGrid from "./components/GifGrid";
import GifModal from "./components/GifModal";
import { searchGifs } from "@/utils/giphy";

export default function Home() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setGifs([]);

    try {
      const results = await searchGifs(query);
      setGifs(results);
    } catch (err) {
      setError("Failed to fetch GIFs. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GIF Explorer</h1>

      <SearchBar onSearch={handleSearch} />

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading GIFs...</p>
      ) : gifs.length === 0 ? (
        <p className="text-gray-500">
          {error ? "Try another search" : "Search for GIFs to get started"}
        </p>
      ) : (
        <GifGrid gifs={gifs} onSelect={setSelectedGif} />
      )}

      {selectedGif && (
        <GifModal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </main>
  );
}
