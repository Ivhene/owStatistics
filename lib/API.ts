"use server";

import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { MatchToSave } from "./types";

const prisma = new PrismaClient();

export async function findAllGames() {
  try {
    const user = await currentUser();
    const res = await prisma.game.findMany({
      include: { matchup: true },
      where: { user1: user?.id },
    });
    return res;
  } catch (error) {
    console.error(error);
    setTimeout(() => findAllGames(), 10000);
    return [];
  }
}

export async function addNewGame(match: MatchToSave) {
  try {
    console.log(match);
    const user = await currentUser();
    const savedMatch = await prisma.game.create({
      data: {
        map: match.map,
        win: match.win,
        user1: user?.id ?? "",
      },
    });

    // Ensure all matchup creations are complete before revalidation
    await Promise.all(
      match.matchup.map(async (m) => {
        const res = await prisma.matchup.create({
          data: {
            heroPlayed: m.heroPlayed,
            win: m.win,
            ally1: m.ally1,
            ally2: m.ally2,
            ally3: m.ally3,
            ally4: m.ally4,
            enemy1: m.enemy1,
            enemy2: m.enemy2,
            enemy3: m.enemy3,
            enemy4: m.enemy4,
            enemy5: m.enemy5,
            matchID: savedMatch.matchID,
          },
        });
        console.log(res);
      })
    );
  } catch (error) {
    console.error("Error adding new game:", error);
  }
}

export async function deleteData() {
  try {
    const data = await findAllGames();
    // Ensure all deletions are complete before revalidation
    await Promise.all(
      data.map(async (match) => {
        await Promise.all(
          match.matchup.map(async (matchup) => {
            await prisma.matchup.delete({
              where: { matchupID: matchup.matchupID },
            });
          })
        );

        await prisma.game.delete({
          where: { matchID: match.matchID },
        });
      })
    );
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
