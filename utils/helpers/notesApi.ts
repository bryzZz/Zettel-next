import { Note } from "@prisma/client";
import axios from "axios";

export const createNewNote = (id: string, title: string) => {
  return axios.post("/api/note", { id, title }).then((res) => res.data);
};

export const updateNote = (
  id: string,
  updates: Partial<Pick<Note, "title" | "text">>
) => {
  return axios.put("/api/note", { id, ...updates }).then((res) => res.data);
};
