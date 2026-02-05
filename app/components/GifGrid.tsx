import { Gif } from "@/types/gif";
import GifCard from "./GifCard";
import GifCardSkeleton from "./GifCardSkeleton";

type Props = {
  gifs: Gif[];
  onSelect: (gif: Gif) => void;
  loading?: boolean;
};

export default function GifGrid({ gifs, onSelect, loading = false }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <GifCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} onClick={() => onSelect(gif)} />
      ))}
    </div>
  );
}
