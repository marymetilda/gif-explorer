"use client";

import { useState, useEffect, useCallback } from "react";

import { Gif } from "@/types/gif";
import SearchBar from "./components/Searchbar";
import GifGrid from "./components/GifGrid";
import GifModal from "./components/GifModal";
import { searchGifs, getTrendingGifs } from "@/utils/giphy";
import NoResults from "./components/NoResults";
import ErrorMessage from "./components/ErrorMessage";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function Home() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<{message: string; retry?: () => void} | null>(null);
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
      setError(null); 
    } catch (err) {
      const errorMessage = searchQuery 
        ? `Failed to load search results for "${searchQuery}".`
        : 'Failed to load trending GIFs.';
      
      setError({
        message: errorMessage,
        retry: () => {
          setLoading(true);
          loadGifs(isNewSearch);
        }
      });
      
      console.error("Error loading GIFs:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchQuery, pagination.offset]);

  const { loadMoreRef } = useInfiniteScroll(async () => {
    if (!loading && !loadingMore && pagination.hasMore) {
      setLoadingMore(true);
      await loadGifs(false);
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setGifs([]);
    setPagination({ offset: 0, hasMore: true });
  };

  useEffect(() => {
    loadGifs(true);
  }, [searchQuery]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GIF Explorer</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="pt-16">
        {error && (
          <div className="mb-4">
            <ErrorMessage 
              message={error.message} 
              onDismiss={() => setError(null)}
              className={error.retry ? 'mb-2' : ''}
            />
            {error.retry && (
              <button
                onClick={error.retry}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try Again
              </button>
            )}
          </div>
        )}

        {loading && gifs.length === 0 ? (
          <GifGrid gifs={[]} onSelect={setSelectedGif} loading={true} />
        ) : gifs.length === 0 && !error ? (
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
