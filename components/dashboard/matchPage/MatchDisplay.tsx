"use client";

import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertHeroPlayedData } from "@/functions/matchDataMapper";
import { getMapImage } from "@/functions/nameToImageConverter";
import { Match } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Equal, X } from "lucide-react";
import Image from "next/image";

interface MatchDisplayProps {
  match: Match;
}

export function MatchDisplay({ match }: MatchDisplayProps) {
  const heroPlayedData = convertHeroPlayedData(match.matchup);

  return (
    <div className="w-full h-full bg-extra_background p-8 space-y-4 flex flex-col">
      <div className="flex flex-row gap-4">
        <div className="bg-main_background w-fit flex flex-col items-center justify-center p-4 gap-4 rounded-xl h-[300px]">
          <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
            Match {match.matchID}: {match.map}
          </h2>
          <Image
            src={getMapImage(match.map) ?? ""}
            alt="Image of the map"
            width={350}
            height={10}
            className="rounded-xl"
          />
        </div>
        <div className="bg-main_background flex flex-col items-center justify-center p-4 gap-4 rounded-xl w-72 h-[300px]">
          <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
            {match.result.charAt(0).toUpperCase() + match.result.slice(1)}
          </h2>
          <div
            className={cn(
              "w-full h-full rounded-xl flex items-center justify-center",
              match.result === "win"
                ? "bg-green-400"
                : match.result === "loss"
                ? "bg-enemy_color"
                : "bg-yellow-400"
            )}
          >
            {match.result === "win" ? (
              <Check className="w-36 h-36 text-main_background" />
            ) : match.result === "loss" ? (
              <X className="w-36 h-36 text-main_background" />
            ) : (
              <Equal className="w-36 h-36 text-main_background" />
            )}
          </div>
        </div>
        <div className="bg-main_background flex-grow flex flex-col items-center  p-4 gap-4 rounded-xl h-[300px] overflow-auto">
          <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
            Heroes played ({heroPlayedData.length})
          </h2>
          <Table className="table-auto w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto pr-2 text-center">Hero</TableHead>
                <TableHead className="w-full text-center">
                  Playing percentage from matchups
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heroPlayedData.map((data) => (
                <TableRow key={data.name}>
                  <TableCell className="flex flex-col items-center gap-2 w-full">
                    <Image
                      src={data.image}
                      alt={`image of ${data.name}`}
                      width={35}
                      height={35}
                    />
                    <span>{data.name}</span>
                  </TableCell>
                  <TableCell className="w-full">
                    <p>{data.percentagePlayed.toFixed(1)}%</p>
                    <Progress
                      className="bg-extra_background"
                      value={data.percentagePlayed}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-full h-full bg-main_background rounded-xl overflow-auto">
        <Table>
          <TableHeader>
            <TableHead className="bg-ally_color text-white text-center">
              Hero played
            </TableHead>
            <TableHead className="bg-ally_color text-white text-center">
              Ally 1
            </TableHead>
            <TableHead className="bg-ally_color text-white text-center">
              Ally 2
            </TableHead>
            <TableHead className="bg-ally_color text-white text-center">
              Ally 3
            </TableHead>
            <TableHead className="bg-ally_color text-white text-center">
              Ally 4
            </TableHead>
            <TableHead className="bg-overwatch_gray_main text-white text-center">
              VS
            </TableHead>
            <TableHead className="bg-enemy_color text-white text-center">
              Enemy 1
            </TableHead>
            <TableHead className="bg-enemy_color text-white text-center">
              Enemy 2
            </TableHead>
            <TableHead className="bg-enemy_color text-white text-center">
              Enemy 3
            </TableHead>
            <TableHead className="bg-enemy_color text-white text-center">
              Enemy 4
            </TableHead>
            <TableHead className="bg-enemy_color text-white text-center">
              Enemy 5
            </TableHead>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
}
