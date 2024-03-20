import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function test() {
  const allGames = await prisma.game.findMany();
  console.log(allGames);
}
