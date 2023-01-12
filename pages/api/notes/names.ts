import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (typeof session?.user?.email !== "string") {
    return res.status(400).send("No session found");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      Notes: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(400).send("User not exists");
  }

  res.status(200).json(user.Notes);
}
