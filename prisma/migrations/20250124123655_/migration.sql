/*
  Warnings:

  - You are about to drop the column `mapID` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `allyIDs` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `enemyIDs` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the column `heroPlayedID` on the `Matchup` table. All the data in the column will be lost.
  - You are about to drop the `GroupMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HeroAllies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HeroEnemies` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `map` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally1` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally2` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally3` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ally4` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy1` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy2` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy3` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy4` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemy5` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroPlayed` to the `Matchup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Matchup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_mapID_fkey";

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_gameID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_heroPlayedID_fkey";

-- DropForeignKey
ALTER TABLE "Matchup" DROP CONSTRAINT "Matchup_matchID_fkey";

-- DropForeignKey
ALTER TABLE "_HeroAllies" DROP CONSTRAINT "_HeroAllies_A_fkey";

-- DropForeignKey
ALTER TABLE "_HeroAllies" DROP CONSTRAINT "_HeroAllies_B_fkey";

-- DropForeignKey
ALTER TABLE "_HeroEnemies" DROP CONSTRAINT "_HeroEnemies_A_fkey";

-- DropForeignKey
ALTER TABLE "_HeroEnemies" DROP CONSTRAINT "_HeroEnemies_B_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "mapID",
ADD COLUMN     "map" VARCHAR(255) NOT NULL,
ALTER COLUMN "user1" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Matchup" DROP COLUMN "allyIDs",
DROP COLUMN "enemyIDs",
DROP COLUMN "heroPlayedID",
ADD COLUMN     "ally1" VARCHAR(255) NOT NULL,
ADD COLUMN     "ally2" VARCHAR(255) NOT NULL,
ADD COLUMN     "ally3" VARCHAR(255) NOT NULL,
ADD COLUMN     "ally4" VARCHAR(255) NOT NULL,
ADD COLUMN     "enemy1" VARCHAR(255) NOT NULL,
ADD COLUMN     "enemy2" VARCHAR(255) NOT NULL,
ADD COLUMN     "enemy3" VARCHAR(255) NOT NULL,
ADD COLUMN     "enemy4" VARCHAR(255) NOT NULL,
ADD COLUMN     "enemy5" VARCHAR(255) NOT NULL,
ADD COLUMN     "heroPlayed" VARCHAR(255) NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL;

-- DropTable
DROP TABLE "GroupMember";

-- DropTable
DROP TABLE "Hero";

-- DropTable
DROP TABLE "Map";

-- DropTable
DROP TABLE "_HeroAllies";

-- DropTable
DROP TABLE "_HeroEnemies";

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "FK__Matchup__matchID__71D1E811" FOREIGN KEY ("matchID") REFERENCES "Game"("matchID") ON DELETE NO ACTION ON UPDATE NO ACTION;
