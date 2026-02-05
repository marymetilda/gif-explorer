import { Gif } from "@/types/gif";

interface GiphyResponse {
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

export async function getTrendingGifs(limit = 24): Promise<Gif[]> {
  if (!process.env.NEXT_PUBLIC_GIPHY_API_KEY) {
    throw new Error('GIPHY API key is not configured');
  }

  const url = new URL('https://api.giphy.com/v1/gifs/trending');
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
    limit: limit.toString(),
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GIPHY API error: ${response.statusText}`);
    }

    const data: GiphyResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching trending GIFs:', error);
    throw error;
  }
}

export async function searchGifs(query: string, limit = 24): Promise<Gif[]> {
  if (!process.env.NEXT_PUBLIC_GIPHY_API_KEY) {
    throw new Error('GIPHY API key is not configured');
  }

  const url = new URL('https://api.giphy.com/v1/gifs/search');
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
    q: query.trim(),
    limit: limit.toString(),
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GIPHY API error: ${response.statusText}`);
    }

    const data: GiphyResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    throw error;
  }
}
