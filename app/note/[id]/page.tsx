"use client";

import { ChangeEvent } from "react";

import { Note } from "@prisma/client";

import { useSWRNote, useSWRNoteNames } from "hooks/fetching";
import { updateNote } from "utils/helpers";

interface NotePageProps {
  params: { id: string };
}

export default function NotePage({ params: { id } }: NotePageProps) {
  const { data, isLoading, mutate: mutateNote } = useSWRNote(id);
  const { mutate: mutateNoteNames } = useSWRNoteNames();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;

    const mutator = () => updateNote(id, { title });

    mutateNote(mutator, {
      optimisticData: (note) => ({ ...note, title } as Note),
      populateCache: (newNote) => newNote,
      revalidate: false,
    });

    mutateNoteNames(mutator, {
      optimisticData: (names: any[] = []) =>
        names.reduce((acc, cur) => {
          if (cur.id === id) {
            return [...acc, { id, title }];
          }

          return [...acc, cur];
        }, []),
      populateCache: (newNote, names = []) => {
        const index = names.findIndex((name) => name.id === newNote.id);

        names[index].title = title;

        return names;
      },
      revalidate: false,
    });
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
