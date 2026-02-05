import { Gif } from "@/types/gif";
import GifCard from "./GifCard";

type Props = {
  gifs: Gif[];
  onSelect: (gif: Gif) => void;
};

export default function GifGrid({ gifs, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} onClick={() => onSelect(gif)} />
      ))}
    </div>
  );
}
