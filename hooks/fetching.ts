import { Note } from "@prisma/client";
import useSWR from "swr";

import { NoteName } from "types";
import { fetcher } from "utils/helpers";

export const useSWRNoteNames = () => {
  const res = useSWR<NoteName[]>("/api/notes", (url) =>
    fetcher(url, { params: { select: "id,title" } })
  );

  return res;
};

export const useSWRNote = (id: string) => {
  const res = useSWR<Note>(["/api/note", id], ([url, id]) =>
    fetcher(url, { params: { id } })
  );

  return res;
};
