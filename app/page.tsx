"use client";

import { useState, useEffect, useCallback } from "react";

import { Gif } from "@/types/gif";
import SearchBar from "./components/Searchbar";
import GifGrid from "./components/GifGrid";
import GifModal from "./components/GifModal";
import { searchGifs, getTrendingGifs} from "@/utils/giphy";
import NoResults from "./components/NoResults";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function Home() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ offset: 0, hasMore: true });

  const loadGifs = useCallback(async (isNewSearch = false) => {
    try {
      const offset = isNewSearch ? 0 : pagination.offset;
      const limit = 24;
      
      const { data, pagination: newPagination } = searchQuery 
        ? await searchGifs(searchQuery, limit, offset)
        : await getTrendingGifs(limit, offset);

      setGifs(prev => isNewSearch ? data : [...prev, ...data]);
      setPagination({
        offset: offset + data.length,
        hasMore: newPagination.offset + newPagination.count < newPagination.total_count
      });
    } catch (err) {
      setError("Failed to load GIFs. Please try again.");
      console.error("Error loading GIFs:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchQuery, pagination.offset]);

  // Load more GIFs when user scrolls to bottom
  const { loadMoreRef } = useInfiniteScroll(async () => {
    if (!loading && !loadingMore && pagination.hasMore) {
      setLoadingMore(true);
      await loadGifs(false);
    }
  });

  // Initial load and search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setGifs([]);
    setPagination({ offset: 0, hasMore: true });
  };

  // Load initial or search results
  useEffect(() => {
    loadGifs(true);
  }, [searchQuery]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GIF Explorer</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="pt-16">
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        {loading && gifs.length === 0 ? (
          <GifGrid gifs={[]} onSelect={setSelectedGif} loading={true} />
        ) : gifs.length === 0 ? (
          <NoResults />
        ) : (
          <>
            <GifGrid gifs={gifs} onSelect={setSelectedGif} loading={false} />
            {loadingMore && (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            <div ref={loadMoreRef} className="h-10" />
          </>
        )}
      </div>

      {selectedGif && (
        <GifModal gif={selectedGif} onClose={() => setSelectedGif(null)} />
      )}
    </main>
  );
}
