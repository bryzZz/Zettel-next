"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { Note } from "@prisma/client";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { BsPencil, BsBook } from "react-icons/bs";
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

  const [editMode, setEditMode] = useState(false);

  const { current: md } = useRef(
    new MarkdownIt({
      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (_) {
            /* empty */
          }
        }

        return ""; // use external default escaping
      },
    })
  );

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
    <div className="h-full">
      <div className="flex justify-end p-4">
        <div className="tooltip tooltip-left" data-tip="Change view">
          <label className="swap rounded p-1 hover:bg-base-content hover:bg-opacity-10">
            <input
              type="checkbox"
              checked={editMode}
              onChange={() => setEditMode((p) => !p)}
            />

            <BsBook className="swap-on h-5 w-5" />
            <BsPencil className="swap-off h-5 w-5" />
          </label>
        </div>
      </div>
      <div className="mx-auto max-w-2xl p-4">
        <TextareaAutosize
          className="mb-4 block resize-none bg-transparent text-3xl font-bold outline-none"
          cacheMeasurements
          value={title}
          onChange={handleChangeTitle}
        />
        {editMode ? (
          <TextareaAutosize
            className="block resize-none bg-transparent outline-none"
            cacheMeasurements
            value={text}
            onChange={handleChangeText}
          />
        ) : (
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: md.render(text),
            }}
          />
        )}
      </div>
    </div>
  );
};
