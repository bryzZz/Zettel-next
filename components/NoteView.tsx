"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

import { Note } from "@prisma/client";
import TextareaAutosize from "react-textarea-autosize";

import { useDebounce, useNote } from "hooks";

interface NoteViewProps {
  initialNote: Note;
}

export const NoteView: React.FC<NoteViewProps> = ({ initialNote }) => {
  const { data, mutation } = useNote(initialNote);

  const [title, setTitle] = useState(initialNote.title);
  const [text, setText] = useState(initialNote.text);
  const debouncedTitle = useDebounce(title, 500);
  const debouncedText = useDebounce(text, 500);

  const id = initialNote.id;

  const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    (e.target.parentElement as HTMLElement).dataset.replicatedValue =
      e.target.value;
    setText(e.target.value);
  };

  useEffect(() => {
    console.log("title mutation");

    mutation.mutate({ id, updates: { title: debouncedTitle } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle, id]);

  useEffect(() => {
    console.log("text mutation");

    mutation.mutate({ id, updates: { text: debouncedText } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText, id]);

  return (
    <div className="mx-auto h-full max-w-2xl p-4">
      <TextareaAutosize
        className="mb-4 block resize-none bg-transparent text-3xl font-bold outline-none"
        cacheMeasurements
        value={title}
        onChange={handleChangeTitle}
      />
      <TextareaAutosize
        className="block h-full resize-none bg-transparent outline-none"
        cacheMeasurements
        value={text}
        onChange={handleChangeText}
      />
    </div>
  );
};
