import { Note } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getNote, updateNote } from "utils/helpers";

export const useNote = (id: string) => {
  const queryClient = useQueryClient();

  const res = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
  });

  const mutation = useMutation({
    mutationFn: updateNote,
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["note", id] });
      const previousNote = queryClient.getQueryData<Note>(["note", id]);

      if (previousNote) {
        queryClient.setQueryData<Note>(["note", id], {
          ...previousNote,
          ...updates,
        });
      }

      return { previousNote };
    },
    onError: (err, variables, context) => {
      if (context?.previousNote) {
        queryClient.setQueryData<Note>(["note", id], context.previousNote);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["note", id]);
      queryClient.invalidateQueries(["noteNames"]);
    },
  });

  return Object.assign(res, { mutation });
};
