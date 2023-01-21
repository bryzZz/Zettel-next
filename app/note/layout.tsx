import { unstable_getServerSession } from "next-auth/next";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import prisma from "@/lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function NoteLayout(props: { children: React.ReactNode }) {
  const session = await unstable_getServerSession(authOptions);
  const notes = await prisma.note.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-main">
        <Sidebar initialNoteNames={notes} />
        <main className="w-full">{props.children}</main>
      </div>
    </div>
  );
}
