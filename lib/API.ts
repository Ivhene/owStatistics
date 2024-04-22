import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAllGames() {
  const res = await prisma.game.findMany({ include: { matchup: true } });
  return res;
}
