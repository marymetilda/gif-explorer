import { Gif } from "@/types/gif";
import Image from "next/image";

type Props = {
  gif: Gif;
  onClose: () => void;
};

export default function GifModal({ gif, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl"
        >
          ✕
        </button>
        <Image
          src={gif.images.original.url}
          alt={gif.title}
          className="w-full rounded"
        />
        <p className="mt-2 text-center">{gif.title}</p>
      </div>
    </div>
  );
}
