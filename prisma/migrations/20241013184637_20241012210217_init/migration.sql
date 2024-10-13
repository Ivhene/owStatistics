/*
  Warnings:

  - You are about to drop the column `map` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `ally1` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `ally2` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `ally3` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `ally4` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy1` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy2` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy3` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy4` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemy5` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `heroPlayed` on the `Matchup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enemy1ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enemy2ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enemy3ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enemy4ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enemy5ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ally1ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ally2ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ally3ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ally4ID]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mapID` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally1ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally2ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally3ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally4ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy1ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy2ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy3ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy4ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy5ID` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroPlayedID` to the `Matchup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "map",
ADD COLUMN     "mapID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Matchup" DROP COLUMN "ally1",
DROP COLUMN "ally2",
DROP COLUMN "ally3",
DROP COLUMN "ally4",
DROP COLUMN "enemy1",
DROP COLUMN "enemy2",
DROP COLUMN "enemy3",
DROP COLUMN "enemy4",
DROP COLUMN "enemy5",
DROP COLUMN "heroPlayed",
ADD COLUMN     "ally1ID" INTEGER NOT NULL,
ADD COLUMN     "ally2ID" INTEGER NOT NULL,
ADD COLUMN     "ally3ID" INTEGER NOT NULL,
ADD COLUMN     "ally4ID" INTEGER NOT NULL,
ADD COLUMN     "enemy1ID" INTEGER NOT NULL,
ADD COLUMN     "enemy2ID" INTEGER NOT NULL,
ADD COLUMN     "enemy3ID" INTEGER NOT NULL,
ADD COLUMN     "enemy4ID" INTEGER NOT NULL,
ADD COLUMN     "enemy5ID" INTEGER NOT NULL,
ADD COLUMN     "heroPlayedID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Hero" (
    "heroID" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "role" VARCHAR(7) NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("heroID")
);

-- CreateTable
CREATE TABLE "Map" (
    "mapID" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "mode" VARCHAR(40) NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("mapID")
);

-- CreateTable
CREATE TABLE "Player" (
    "playerID" SERIAL NOT NULL,
    "groupedWithYou" BOOLEAN NOT NULL,
    "heroPlayedID" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_enemy1ID_key" ON "Matchup"("enemy1ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_enemy2ID_key" ON "Matchup"("enemy2ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_enemy3ID_key" ON "Matchup"("enemy3ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_enemy4ID_key" ON "Matchup"("enemy4ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_enemy5ID_key" ON "Matchup"("enemy5ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_ally1ID_key" ON "Matchup"("ally1ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_ally2ID_key" ON "Matchup"("ally2ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_ally3ID_key" ON "Matchup"("ally3ID");

-- CreateIndex
CREATE UNIQUE INDEX "Matchup_ally4ID_key" ON "Matchup"("ally4ID");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_mapID_fkey" FOREIGN KEY ("mapID") REFERENCES "Map"("mapID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_heroPlayedID_fkey" FOREIGN KEY ("heroPlayedID") REFERENCES "Hero"("heroID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_enemy1ID_fkey" FOREIGN KEY ("enemy1ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_enemy2ID_fkey" FOREIGN KEY ("enemy2ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_enemy3ID_fkey" FOREIGN KEY ("enemy3ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_enemy4ID_fkey" FOREIGN KEY ("enemy4ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_enemy5ID_fkey" FOREIGN KEY ("enemy5ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_ally1ID_fkey" FOREIGN KEY ("ally1ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_ally2ID_fkey" FOREIGN KEY ("ally2ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_ally3ID_fkey" FOREIGN KEY ("ally3ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_ally4ID_fkey" FOREIGN KEY ("ally4ID") REFERENCES "Player"("playerID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_heroPlayedID_fkey" FOREIGN KEY ("heroPlayedID") REFERENCES "Hero"("heroID") ON DELETE RESTRICT ON UPDATE NO ACTION;
