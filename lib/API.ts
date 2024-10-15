"use server";

import { PrismaClient } from "@prisma/client";
import { Match, MatchToSave } from "./types";
import { currentUser } from "@clerk/nextjs/server";

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
  try {
    const user = await currentUser();
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

    // Ensure all matchup creations are complete before revalidation
    await Promise.all(
      match.matchup.map(async (m) => {
        const res = await prisma.matchup.create({
          data: {
            heroPlayedID: (await findHeroByName(m.heroPlayed))?.heroID ?? 0,
            win: m.win,
            enemyIDs: [
              (await findHeroByName(m.enemy1))?.heroID ?? 0,
              (await findHeroByName(m.enemy2))?.heroID ?? 0,
              (await findHeroByName(m.enemy3))?.heroID ?? 0,
              (await findHeroByName(m.enemy4))?.heroID ?? 0,
              (await findHeroByName(m.enemy5))?.heroID ?? 0,
            ],
            allyIDs: [
              (await findHeroByName(m.ally1))?.heroID ?? 0,
              (await findHeroByName(m.ally2))?.heroID ?? 0,
              (await findHeroByName(m.ally3))?.heroID ?? 0,
              (await findHeroByName(m.ally4))?.heroID ?? 0,
            ],
            matchID: savedMatch.matchID,
          },
        });
        return res;
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
