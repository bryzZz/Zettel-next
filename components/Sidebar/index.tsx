"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import { v4 as uuid } from "uuid";

import { useNoteNames } from "hooks";
import { NoteName } from "types";

import { NoteLink } from "./NoteLink";

interface SidebarProps {
  initialNoteNames?: NoteName[];
}

export const Sidebar: React.FC<SidebarProps> = ({ initialNoteNames }) => {
  const pathName = usePathname();
  const router = useRouter();

  const { data, isLoading, createMutation, deleteMutation } =
    useNoteNames(initialNoteNames);

  const handleCreateNote = () => {
    const id = uuid();

    createMutation.mutate(
      { id, title: "Unnamed" },
      {
        onSuccess: () => {
          router.push("/note/" + id);
        },
      }
    );
  };

  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        const currentPathId = pathName?.split("/").at(-1);
        if (currentPathId === id) {
          router.push("/note");
        }
      },
    });
  };

  return (
    <aside className="h-full basis-80 border-r border-r-base-content border-opacity-10 p-4">
      <div className="mb-2 flex items-center justify-end">
        <div className="tooltip tooltip-bottom" data-tip="Create note">
          <button
            onClick={handleCreateNote}
            className="rounded p-1 hover:bg-base-content hover:bg-opacity-10"
          >
            <BsPencilSquare className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isLoading && "Loading..."}

      <div className="flex flex-col items-stretch gap-[1px]">
        {data?.map(({ id, title }) => (
          <NoteLink
            key={id}
            href={`/note/${id}`}
            onDelete={() => handleDeleteNote(id)}
          >
            {title}
          </NoteLink>
        ))}
      </div>
    </aside>
  );
};
