import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { NoteName } from "types";
import { createNote, getNotes } from "utils/helpers";

export const useNoteNames = (initialData?: NoteName[]) => {
  const queryClient = useQueryClient();

  const res = useQuery<NoteName[]>({
    queryKey: ["noteNames"],
    queryFn: () => getNotes("id,title"),
    initialData,
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: ["noteNames"] });
      const previousNoteNames = queryClient.getQueryData<NoteName[]>([
        "noteNames",
      ]);

      if (previousNoteNames) {
        queryClient.setQueryData<NoteName[]>(
          ["noteNames"],
          [newNote, ...previousNoteNames]
        );
      }

      return { previousNoteNames };
    },
    onError: (err, variables, context) => {
      if (context?.previousNoteNames) {
        queryClient.setQueryData<NoteName[]>(
          ["noteNames"],
          context.previousNoteNames
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["noteNames"]);
    },
  });

  return Object.assign(res, { mutation });
};
