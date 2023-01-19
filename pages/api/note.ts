import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { unstable_getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getNote = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).send("No id");
  }

  const note = await prisma.note.findFirst({
    where: {
      userId: session.user.id,
      id,
    },
  });

  return res.status(200).json(note);
};

const createNote = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { id, title } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return res.status(400).send("User not exists");
  }

  const note = await prisma.note.create({
    data: {
      id,
      userId: user.id,
      title,
      text: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return res.status(200).json(note);
};

const updateNote = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { id, ...updates } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return res.status(400).send("User not exists");
  }

  const note = await prisma.note.update({
    where: { id },
    data: updates,
  });

  return res.status(200).json(note);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).send("No session found");
  }

  const { method } = req;

  switch (method) {
    case "GET":
      await getNote(req, res, session);
      break;
    case "POST":
      await createNote(req, res, session);
      break;
    case "PUT":
      await updateNote(req, res, session);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
