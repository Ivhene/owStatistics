-- CreateTable
CREATE TABLE "Game" (
    "matchID" SERIAL NOT NULL,
    "map" VARCHAR(40) NOT NULL,
    "user1" VARCHAR(100) NOT NULL,
    "result" VARCHAR(4) NOT NULL,
    "role" VARCHAR(7) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("matchID")
);

-- CreateTable
CREATE TABLE "Matchup" (
    "matchupID" SERIAL NOT NULL,
    "heroPlayed" VARCHAR(40) NOT NULL,
    "win" BOOLEAN NOT NULL,
    "enemy1" VARCHAR(40) NOT NULL,
    "enemy2" VARCHAR(40) NOT NULL,
    "enemy3" VARCHAR(40) NOT NULL,
    "enemy4" VARCHAR(40) NOT NULL,
    "enemy5" VARCHAR(40) NOT NULL,
    "ally1" VARCHAR(40) NOT NULL,
    "ally2" VARCHAR(40) NOT NULL,
    "ally3" VARCHAR(40) NOT NULL,
    "ally4" VARCHAR(40) NOT NULL,
    "matchID" INTEGER NOT NULL,

    CONSTRAINT "Matchup_pkey" PRIMARY KEY ("matchupID")
);

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_matchID_fkey" FOREIGN KEY ("matchID") REFERENCES "Game"("matchID") ON DELETE RESTRICT ON UPDATE NO ACTION;
