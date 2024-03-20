import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  /*const req = await request.json();
  console.log(req.user); */

  const games = await prisma.game.findMany({
    include: { matchup: true },
  });
  console.log(games);
  return NextResponse.json({
    games: games,
  });
}
