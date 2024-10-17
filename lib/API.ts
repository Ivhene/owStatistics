"use server";

import { PrismaClient } from "@prisma/client";
import { Match, MatchToSave } from "./types";
import { currentUser } from "@clerk/nextjs/server";
import { Heroes } from "./constants";

const prisma = new PrismaClient();

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function findAllMaps() {
  try {
    const res = await prisma.map.findMany();
    return res;
  } catch (error) {
    console.error("Error fetching all maps:", error);
  }
}

export async function findMapByName(name: string) {
  try {
    const res = await prisma.map.findFirst({
      where: { name: name },
    });
    return res;
  } catch (error) {
    console.error("Error fetching map by name:", error);
  }
}

export async function findAllHeroes() {
  try {
    const res = await prisma.hero.findMany();
    return res;
  } catch (error) {
    console.error("Error fetching all heroes:", error);
  }
}

export async function findHeroByName(name: string) {
  try {
    const res = await prisma.hero.findFirst({
      where: { name: name },
    });
    return res;
  } catch (error) {
    console.error("Error fetching hero by name:", error);
  }
}

export async function findAllGames() {
  console.log("find");
  try {
    const user = await currentUser();
    if (!user) {
      // If user is not authenticated, redirect to the login page
      window.location.href = "/sign-in";
      return;
    }

    const games = await prisma.game.findMany({
      include: {
        map: true,
        matchups: {
          include: {
            heroPlayed: true, // Include Hero for Matchup
          },
        },
        groupMembers: true,
      },
      where: { user1: user?.id },
    });

    // Resolve enemies and allies for each matchup
    const resolvedGames = await Promise.all(
      games.map(async (game) => {
        const resolvedMatchups = await Promise.all(
          game.matchups.map(async (matchup) => {
            const enemies = matchup.enemyIDs.map(
              (enemy) =>
                Heroes.find((h) => h.heroID === enemy) ?? {
                  heroID: -1,
                  name: "",
                  image: "",
                  role: "",
                }
            );
            const allies = matchup.allyIDs.map(
              (ally) =>
                Heroes.find((h) => h.heroID === ally) ?? {
                  heroID: -1,
                  name: "",
                  image: "",
                  role: "",
                }
            );

            return {
              ...matchup,
              enemies,
              allies,
            };
          })
        );

        return {
          ...game,
          matchups: resolvedMatchups,
        };
      })
    );

    return resolvedGames;
  } catch (error) {
    console.error(error);
    await delay(10000);
    return findAllGames();
  }
}

export async function findGame(gameID: number) {
  console.log("find");
  try {
    const game = await prisma.game.findUnique({
      where: { matchID: gameID },
      include: {
        map: true,
        matchups: {
          include: {
            heroPlayed: true, // Include Hero for Matchup
          },
        },
        groupMembers: true,
      },
    });

    if (!game) return null;

    // Resolve enemies and allies for each matchup
    const resolvedMatchups = await Promise.all(
      game.matchups.map(async (matchup) => {
        const enemies = await prisma.hero.findMany({
          where: { heroID: { in: matchup.enemyIDs } },
        });
        const allies = await prisma.hero.findMany({
          where: { heroID: { in: matchup.allyIDs } },
        });

        return {
          ...matchup,
          enemies,
          allies,
        };
      })
    );

    return {
      ...game,
      matchups: resolvedMatchups,
    };
  } catch (error) {
    console.error(error);
    await delay(10000);
    return findGame(gameID);
  }
}

export async function addNewGame(match: MatchToSave) {
  console.log("STARTED ADDING");
  try {
    const user = await currentUser();
    const savedMatch = await prisma.game.create({
      data: {
        mapID: (await findMapByName(match.map))?.mapID ?? 0,
        result: match.result,
        role: match.role,
        user1: user?.id ?? "",
      },
    });

    console.log("Game created");

    // Ensure all matchup creations are complete before revalidation
    await Promise.all(
      match.matchup.map(async (m) => {
        const res = await prisma.matchup.create({
          data: {
            heroPlayedID: Heroes.find((h) => h.name === m.enemy1)?.heroID ?? 0,
            win: m.win,
            enemyIDs: [
              Heroes.find((h) => h.name === m.enemy1)?.heroID ?? 0,
              Heroes.find((h) => h.name === m.enemy2)?.heroID ?? 0,
              Heroes.find((h) => h.name === m.enemy3)?.heroID ?? 0,
              Heroes.find((h) => h.name === m.enemy4)?.heroID ?? 0,
              Heroes.find((h) => h.name === m.enemy5)?.heroID ?? 0,
            ],
            allyIDs: [
              Heroes.find((h) => h.name === m.ally1)?.heroID ?? 0,
              Heroes.find((h) => h.name === m.ally2)?.heroID ?? 0,
              Heroes.find((h) => h.name === m.ally3)?.heroID ?? 0,
              Heroes.find((h) => h.name === m.ally4)?.heroID ?? 0,
            ],
            matchID: savedMatch.matchID,
          },
        });
        return res;
      })
    );
    console.log("?");
  } catch (error) {
    console.error("Error adding new game:", error);
  }
}

export async function deleteData() {
  try {
    const data = await findAllGames();
    if (!data) {
      return;
    }
    // Ensure all deletions are complete before revalidation
    await Promise.all(
      data.map(async (match) => {
        await Promise.all(
          match.matchups.map(async (matchup) => {
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

export async function deleteMatches(matches: Match[]) {
  await Promise.all(
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
}
