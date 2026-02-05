"use client";

import { SubmitEventHandler } from "react";

type SearchbarProps = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: SearchbarProps) {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = (e.currentTarget.search.value || "").trim();
    if (value) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="search"
        placeholder="Search GIFs..."
        className="border p-2 flex-1 rounded"
      />
      <button className="bg-black dark:bg-gray-800 text-white px-4 rounded">Search</button>
    </form>
  );
}
