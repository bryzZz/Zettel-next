"use client";

import { ChangeEvent } from "react";

import { useNote } from "hooks";

interface NotePageProps {
  params: { id: string };
}

export default function NotePage({ params: { id } }: NotePageProps) {
  const { data, isLoading, mutation } = useNote(id);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;

    mutation.mutate({ id, updates: { title } });
  };

  return (
    <div className="basis-auto">
      {isLoading || !data ? (
        "Loading..."
      ) : (
        <input
          className="text-black"
          value={data.title}
          onChange={handleChangeTitle}
        />
      )}
    </div>
  );
}
