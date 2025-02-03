"use client";

import { convertHeroPlayedData } from "@/functions/matchDataMapper";
import { Heroes } from "@/lib/constants";
import { Matchup, MatchupWithMaps } from "@/lib/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";

export function CustomTooltip(props: any) {
  const path = usePathname();
  // console.log(props);

  let dataCount = 0;
  props.payload.forEach((prop: any) => (dataCount += prop.value));

  if (dataCount === 0) {
    return null;
  }

  let matchups: MatchupWithMaps[] = [];
  props.payload.forEach(
    (prop: any) => (matchups = [...matchups, ...prop.payload.matchups])
  );

  const matchupWithoutMap: Matchup[] = matchups.map((matchup, index) => {
    return {
      matchID: matchup.matchupID,
      heroPlayed: matchup.heroPlayed.name,
      matchupID: matchup.matchupID,
      win: matchup.win,
      ally1: matchup.ally1.name,
      ally2: matchup.ally2.name,
      ally3: matchup.ally3.name,
      ally4: matchup.ally4.name,
      enemy1: matchup.enemy1.name,
      enemy2: matchup.enemy2.name,
      enemy3: matchup.enemy3.name,
      enemy4: matchup.enemy4.name,
      enemy5: matchup.enemy5.name,
      order: index,
    };
  });

  const matches = matchups
    .map((matchup) => matchup.match.matchID)
    .filter((matchID, index, self) => self.indexOf(matchID) === index); // gets rid of duplicates

  console.log(matches);

  const matchupsWithMatch = matchups;

  const heroPlayedData = convertHeroPlayedData(matchupWithoutMap);

  let against;

  return (
    <div key={props.label} className="bg-white flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="">
          {path === "/mypage/maps" ? (
            <React.Fragment>
              <h2>Map</h2>
              <Image
                alt="Image of map"
                width={70}
                height={70}
                src={props.label}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Hero</h2>
              <Image
                alt="Image of hero"
                width={250}
                height={250}
                src={props.label}
              />
            </React.Fragment>
          )}
        </div>
        <div className="">
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
      {path === "/mypage/maps" ? null : <div>Other heroes against/with</div>}
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
          From matches
        </h2>
        <div className="grid grid-cols-1 gap-4 justify-items-center w-full">
          {matches.map((match, index) => (
            <p key={index}>[{match}]</p>
          ))}
        </div>
      </div>
    </div>
  );
}
