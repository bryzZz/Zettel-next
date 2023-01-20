"use client";

import React, { useState } from "react";

import Link from "next/link";
import { v4 as uuid } from "uuid";

import { Input } from "@/components/shared";
import { useNoteNames } from "hooks";
import { NoteName } from "types";

interface SidebarProps {
  initialNoteNames?: NoteName[];
}

export const Sidebar: React.FC<SidebarProps> = ({ initialNoteNames }) => {
  const [title, setTitle] = useState("");

  const { data, isLoading, mutation } = useNoteNames(initialNoteNames);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({ id: uuid(), title });

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

      {data?.map(({ id, title }) => (
        <p key={id} className="caret-red-700">
          <Link href={`/note/${id}`}>{title}</Link>
        </p>
      ))}
    </aside>
  );
};
