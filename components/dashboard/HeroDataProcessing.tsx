"use client";
import { Match, Matchup } from "@/lib/types";
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
import PreviousMap from "postcss/lib/previous-map";

interface HeroDataProps {
  data: Match[];
}

export function HeroDataProcessing({ data }: HeroDataProps) {
  const [filterStates, setFilterStates] = useState({
    selectHeroPlayed: "",
    selectMapType: "",
    selectMap: "",
  });

  let matchups: Matchup[] = [];
  data.forEach((match) =>
    match.matchup.forEach((matchup) => matchups.push(matchup))
  );

  const [displayData, setDisplayData] = useState<Matchup[]>(matchups);

  useEffect(() => {
    if (filterStates.selectHeroPlayed !== "") {
      setDisplayData(
        matchups.filter(
          (matchup) => matchup.heroPlayed === filterStates.selectHeroPlayed
        )
      );
    }
  }, [filterStates]);

  function selectHero() {
    let res = [];

    for (const hero of Heroes) {
      res.push(<SelectItem value={hero.name}>{hero.name}</SelectItem>);
    }
    return res;
  }

  function selectMaps() {
    let res = [];

    for (const maps of Maps) {
      res.push(<SelectItem value={maps.name}>{maps.name}</SelectItem>);
    }

    return res;
  }

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-full h-fit bg-slate-100 m-16">
        <div className="w-full h-24 flex gap-4">
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
            <SelectContent className="max-h-64">{selectHero()}</SelectContent>
          </Select>
          <div>Select Map Type</div>
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
        </div>
        <HeroDataDisplay data={displayData} />
      </div>
    </div>
  );
}
