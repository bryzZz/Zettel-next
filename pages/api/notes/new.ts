import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, noteName } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
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
