/*
  Warnings:

  - You are about to drop the column `ally1ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `ally2ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `ally3ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `ally4ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy1ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy2ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy3ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy4ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy5ID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_ally1ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_ally2ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_ally3ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_ally4ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_enemy1ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_enemy2ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_enemy3ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_enemy4ID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_enemy5ID_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_heroPlayedID_fkey";

-- DropIndex
DROP INDEX "Matchup_ally1ID_key";

-- DropIndex
DROP INDEX "Matchup_ally2ID_key";

-- DropIndex
DROP INDEX "Matchup_ally3ID_key";

-- DropIndex
DROP INDEX "Matchup_ally4ID_key";

-- DropIndex
DROP INDEX "Matchup_enemy1ID_key";

-- DropIndex
DROP INDEX "Matchup_enemy2ID_key";

-- DropIndex
DROP INDEX "Matchup_enemy3ID_key";

-- DropIndex
DROP INDEX "Matchup_enemy4ID_key";

-- DropIndex
DROP INDEX "Matchup_enemy5ID_key";

-- AlterTable
ALTER TABLE "Matchup" DROP COLUMN "ally1ID",
DROP COLUMN "ally2ID",
DROP COLUMN "ally3ID",
DROP COLUMN "ally4ID",
DROP COLUMN "enemy1ID",
DROP COLUMN "enemy2ID",
DROP COLUMN "enemy3ID",
DROP COLUMN "enemy4ID",
DROP COLUMN "enemy5ID",
ADD COLUMN     "allyIDs" INTEGER[],
ADD COLUMN     "enemyIDs" INTEGER[];

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "GroupMember" (
    "groupMemberID" SERIAL NOT NULL,
    "allyNumber" INTEGER NOT NULL,
    "role" VARCHAR(7) NOT NULL,
    "gameID" INTEGER NOT NULL,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("groupMemberID")
);

-- CreateTable
CREATE TABLE "_HeroEnemies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HeroAllies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HeroEnemies_AB_unique" ON "_HeroEnemies"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroEnemies_B_index" ON "_HeroEnemies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HeroAllies_AB_unique" ON "_HeroAllies"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroAllies_B_index" ON "_HeroAllies"("B");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game"("matchID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_HeroEnemies" ADD CONSTRAINT "_HeroEnemies_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("heroID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroEnemies" ADD CONSTRAINT "_HeroEnemies_B_fkey" FOREIGN KEY ("B") REFERENCES "Matchup"("matchupID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroAllies" ADD CONSTRAINT "_HeroAllies_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("heroID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroAllies" ADD CONSTRAINT "_HeroAllies_B_fkey" FOREIGN KEY ("B") REFERENCES "Matchup"("matchupID") ON DELETE CASCADE ON UPDATE CASCADE;
