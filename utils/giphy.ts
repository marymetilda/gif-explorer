import type { Gif } from "@/types/gif";

export type { Gif };

export interface GiphyResponse {
  data: Gif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

export interface GiphySearchResult {
  data: Gif[];
  pagination: GiphyResponse['pagination'];
}

export async function getTrendingGifs(limit = 24, offset = 0): Promise<GiphySearchResult> {
  if (!process.env.NEXT_PUBLIC_GIPHY_API_KEY) {
    throw new Error('GIPHY API key is not configured');
  }

  const url = new URL('https://api.giphy.com/v1/gifs/trending');
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
    limit: limit.toString(),
    offset: offset.toString(),
    rating: 'g',
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GIPHY API error: ${response.statusText}`);
    }

    const data: GiphyResponse = await response.json();
    return {
      data: data.data,
      pagination: data.pagination
    };
  } catch (error) {
    console.error('Error fetching trending GIFs:', error);
    throw error;
  }
}

export async function searchGifs(query: string, limit = 24, offset = 0): Promise<GiphySearchResult> {
  if (!process.env.NEXT_PUBLIC_GIPHY_API_KEY) {
    throw new Error('GIPHY API key is not configured');
  }

  const url = new URL('https://api.giphy.com/v1/gifs/search');
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
    q: query.trim(),
    limit: limit.toString(),
    offset: offset.toString(),
    rating: 'g',
    lang: 'en',
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GIPHY API error: ${response.statusText}`);
    }

    const data: GiphyResponse = await response.json();
    return {
      data: data.data,
      pagination: data.pagination
    };
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    throw error;
  }
}
