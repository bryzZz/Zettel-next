import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getNote = async (userId: string, id: string) => {
  const note = await prisma.note.findFirst({
    where: { userId, id },
  });

  return note;
};

const createNote = async (userId: string, id: string, title: string) => {
  const lastNotePlace = await prisma.note.findMany({
    where: { userId },
    select: { place: true },
    orderBy: { place: "asc" },
    take: -1,
  });

  const newPlace =
    typeof lastNotePlace[0]?.place === "number"
      ? lastNotePlace[0].place + 1
      : 0;

  const note = await prisma.note.create({
    data: {
      id,
      userId,
      place: newPlace,
      title,
      text: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return note;
};

const updateNote = async (userId: string, id: string, updates: any) => {
  const note = await prisma.note.update({
    where: { id },
    data: updates,
  });

  return note;
};

const deleteNote = async (userId: string, id: string) => {
  const note = await prisma.note.delete({
    where: { id },
  });

  return note;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).send("No session found");
  }

  const userId = session.user.id;
  const { method } = req;
  const { id } = req.query;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(400).send("User not exists");
  }

  if (typeof id !== "string") {
    return res.status(400).send("No id");
  }

  if (method === "GET") {
    const note = await getNote(userId, id);
    return res.status(200).json(note);
  }

  if (method === "POST") {
    const { title } = req.body;
    const note = await createNote(userId, id, title);
    return res.status(200).json(note);
  }

  if (method === "PUT") {
    const { ...updates } = req.body;
    const note = await updateNote(userId, id, updates);
    return res.status(200).json(note);
  }

  if (method === "DELETE") {
    const note = await deleteNote(userId, id);
    return res.status(200).json(note);
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
