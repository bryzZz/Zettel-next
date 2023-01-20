import { Note } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";

import { NoteView } from "@/components/NoteView";
import prisma from "@/lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params: { id } }: NotePageProps) {
  const session = await unstable_getServerSession(authOptions);
  const note = await prisma.note.findFirst({
    where: {
      userId: session?.user.id,
      id,
    },
  });

  return <NoteView initialNote={note as Note} />;
}
