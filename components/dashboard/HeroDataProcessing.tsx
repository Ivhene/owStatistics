"use client";
import { Match, Matchup, MatchupWithMaps } from "@/lib/types";
import HeroDataDisplay from "./HeroDataDisplay";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Heroes, Maps } from "@/lib/constants";
import { addMatchToMatchup } from "@/functions/addMatchToMatchup";
import {
  selectHero,
  selectMaps,
  selectMapTypes,
} from "@/functions/selectMapper";
import { findMaptypeOfMap } from "@/functions/findMaptypeOfMap";
import { Button } from "../ui/button";

interface HeroDataProps {
  data: Match[];
}

export function HeroDataProcessing({ data }: HeroDataProps) {
  const [filterStates, setFilterStates] = useState({
    selectHeroPlayed: "",
    selectMapType: "",
    selectMap: "",
    selectRole: "",
  });

  let matchups: MatchupWithMaps[] = addMatchToMatchup(data);

  const [displayData, setDisplayData] = useState<MatchupWithMaps[]>(matchups);

  useEffect(() => {
    let filteredMatchups = matchups;
    if (filterStates.selectHeroPlayed !== "") {
      filteredMatchups = filteredMatchups.filter(
        (matchup) => matchup.heroPlayed === filterStates.selectHeroPlayed
      );
    }
    if (filterStates.selectMap !== "") {
      filteredMatchups = filteredMatchups.filter(
        (matchup) => matchup.match.map === filterStates.selectMap
      );
    }
    if (filterStates.selectMapType !== "") {
      filteredMatchups = filteredMatchups.filter(
        (matchup) =>
          findMaptypeOfMap(matchup.match.map) === filterStates.selectMapType
      );
    }
    setDisplayData(filteredMatchups);
  }, [filterStates]);

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-full h-fit bg-slate-100 m-16">
        <div className="w-full h-24 flex gap-4">
          <Select
            onValueChange={(value) => {
              setFilterStates((prev) => ({
                ...prev,
                selectRole: value,
              }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <SelectItem value="tank">Tank</SelectItem>
              <SelectItem value="damage">Damage</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setFilterStates((prev) => ({
                ...prev,
                selectHeroPlayed: value,
              }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select hero played" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {/*<SelectItem value="any">Any</SelectItem>*/}
              {selectHero()}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setFilterStates((prev) => ({
                ...prev,
                selectMapType: value,
              }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select map types" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {selectMapTypes()}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setFilterStates((prev) => ({
                ...prev,
                selectMap: value,
              }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select map" />
            </SelectTrigger>
            <SelectContent className="max-h-64">{selectMaps()}</SelectContent>
          </Select>
          <Button
            onClick={() =>
              setFilterStates({
                selectHeroPlayed: "",
                selectMap: "",
                selectMapType: "",
                selectRole: "",
              })
            }
          >
            Clear Filters
          </Button>
        </div>
        <HeroDataDisplay role={filterStates.selectRole} data={displayData} />
      </div>
    </div>
  );
}
