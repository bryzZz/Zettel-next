"use client";

import { Input } from "@/components/shared";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "utils/helpers";

export const Sidebar: React.FC<{}> = () => {
  const [newNoteName, setNewNoteName] = useState("");
  const {
    data: noteNames,
    isLoading,
    mutate,
  } = useSWR<string[]>("/api/notes/names", fetcher);

  const addNewNote = () => {
    return fetcher("/api/notes/new", {
      method: "POST",
      body: {
        noteName: newNoteName,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate(() => addNewNote(), {
      optimisticData: (names) => [...(names || []), newNoteName],
      populateCache: (newNote, names) => [...(names || []), newNote.title],
      revalidate: false,
    });
  };

  return (
    <div className="max-w-xs">
      <form onSubmit={handleSubmit}>
        <Input
          label="New note Value"
          value={newNoteName}
          onChange={(e) => setNewNoteName(e.target.value)}
        />
      </form>

      {isLoading && "Loading..."}

      {noteNames?.map((name) => (
        <p key={name} className="caret-red-700">
          {name}
        </p>
      ))}
    </div>
  );
};
