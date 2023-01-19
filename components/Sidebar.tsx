"use client";

import React, { useState } from "react";

import Link from "next/link";
import useSWR from "swr";
import { v4 as uuid } from "uuid";

import { Input } from "@/components/shared";
import { useSWRNoteNames } from "hooks/fetching";
import { createNewNote, fetcher } from "utils/helpers";

export const Sidebar: React.FC<{}> = () => {
  const [title, setTitle] = useState("");
  const { data: noteNames, isLoading, mutate } = useSWRNoteNames();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNoteId = uuid();

    mutate(() => createNewNote(newNoteId, title), {
      optimisticData: (names = []) => [...names, { id: newNoteId, title }],
      populateCache: (newNote, names = []) => [...names, newNote],
      revalidate: false,
    });

    setTitle("");
  };

  return (
    <aside className="basis-80 h-full p-4 bg-neutral-900 border-r border-neutral-800">
      <form onSubmit={handleSubmit}>
        <Input
          label="New note Value"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      {isLoading && "Loading..."}

      {noteNames?.map(({ id, title }) => (
        <p key={id} className="caret-red-700">
          <Link href={`/note/${id}`}>{title}</Link>
        </p>
      ))}
    </aside>
  );
};
