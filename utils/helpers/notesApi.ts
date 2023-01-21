import { Note } from "@prisma/client";
import axios from "axios";

import { NoteName } from "types";

export const getNotes = (select: string): Promise<NoteName[]> => {
  return axios
    .get("/api/notes", { params: { select } })
    .then((res) => res.data);
};

export const getNote = (id: string) => {
  return axios.get(`/api/notes/${id}`).then((res) => res.data);
};

export const createNote = ({
  id,
  title,
}: {
  id: string;
  title: string;
}): Promise<Note> => {
  return axios.post(`/api/notes/${id}`, { title }).then((res) => res.data);
};

export const updateNote = ({
  id,
  updates,
}: {
  id: string;
  updates: Partial<Pick<Note, "title" | "text" | "place">>;
}) => {
  return axios.put(`/api/notes/${id}`, updates).then((res) => res.data);
};

export const deleteNote = (id: string) => {
  return axios.delete(`/api/notes/${id}`).then((res) => res.data);
};
