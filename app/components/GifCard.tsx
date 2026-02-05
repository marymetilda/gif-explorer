import { Gif } from "@/types/gif";
import Image from "next/image";

type Props = {
  gif: Gif;
  onClick: () => void;
};

export default function GifCard({ gif, onClick }: Props) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Image
        src={gif.images.fixed_height.url ?? ""}
        alt={gif.title}
        className="rounded w-full"
      />
      <p className="text-sm mt-1 truncate">{gif.title || "Untitled GIF"}</p>
    </div>
  );
}
