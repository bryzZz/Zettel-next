import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).send("No session found");
  }

  const { noteName } = req.body;

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
      userId: user.id,
      title: noteName,
      text: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  res.status(200).json(note);
}
