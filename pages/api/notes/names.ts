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

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      title: true,
    },
  });

  res.status(200).json(notes.map(({ title }) => title));
}
