"use server";

import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { Match, MatchToSave } from "./types";
import {
  addMatch,
  addMatchupToMatch,
  deleteAllMatchesByUser,
  deleteMatch,
  getAllMatchesByUser,
  getMatch,
} from "./testData";

const prisma = new PrismaClient();

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function findAllGames() {
  /*  try {
    const user = await currentUser();
    const res = await prisma.game.findMany({
      include: { matchup: true },
      where: { user1: user?.id },
    });
    return res;
  } catch (error) {
    console.error(error);
    await delay(10000);
    return findAllGames();
  } */
  const user = await currentUser();
  return getAllMatchesByUser(user?.id ?? "");
}

export async function findGame(matchID: number) {
  /*try {
    const user = await currentUser();
    const res = await prisma.game.findFirst({
      include: { matchup: true },
      where: { user1: user?.id, matchID: matchID },
    });
    return res;
  } catch (error) {
    console.error(error);
    await delay(10000);
    return findGame(matchID);
  } */

  const user = await currentUser();
  const match = getMatch(matchID);
  if (user?.id !== match?.user1) {
    return;
  }
  return match;
}

export async function addNewGame(match: MatchToSave) {
  /* try {
    const user = await currentUser();
    const savedMatch = await prisma.game.create({
      data: {
        map: match.map,
        result: match.result,
        role: match.role,
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
      })
    );
  } catch (error) {
    console.error("Error adding new game:", error);
  }
  */
  const user = await currentUser();
  const newMatch = addMatch(match, user?.id ?? "");
  match.matchup.forEach((matchup) =>
    addMatchupToMatch(newMatch.matchID, matchup)
  );
}

export async function deleteData() {
  /* try {
    const data = await findAllGames();
    // Ensure all deletions are complete before revalidation
    await Promise.all(
      data.map(async (match: Match) => {
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
  } */

  const user = await currentUser();
  if (user?.id) {
    deleteAllMatchesByUser(user.id);
  }
}

export async function deleteMatches(matches: Match[]) {
  /* await Promise.all(
    matches.map(async (match: Match) => {
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
  */

  const user = await currentUser();
  if (user?.id) {
    matches.forEach((match) =>
      user.id === match.user1 ? deleteMatch(match) : null
    );
  }
}
