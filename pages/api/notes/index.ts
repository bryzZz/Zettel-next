import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).send("No session found");
  }

  const { select: querySelect } = req.query;
  let select;

  if (querySelect && typeof querySelect === "string") {
    select = querySelect
      .split(",")
      .reduce((acc, cur) => ({ ...acc, [cur]: true }), {});
  }

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
    },
    select,
    orderBy: {
      place: "desc",
    },
  });

  return res.status(200).json(notes);
}
