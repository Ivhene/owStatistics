"use client";
import { Match, MatchupWithMaps } from "@/lib/types";
import HeroDataDisplay from "./HeroDataDisplay";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addMatchToMatchup } from "@/functions/addMatchToMatchup";
import {
  selectHero,
  selectMaps,
  selectMapTypes,
} from "@/functions/selectMapper";
import { findMaptypeOfMap } from "@/functions/findMaptypeOfMap";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { NewMatchForm } from "./NewMatchForm";
import { UserButton } from "@clerk/nextjs";
import { deleteData } from "@/lib/API";

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
  const [open, setOpen] = useState(false);

  // close new match dialog
  function closeDialog() {
    setOpen(!open);
  }

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
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-fit bg-slate-100 p-4">
        <div className="w-full h-fit p-2 flex gap-4">
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
            <SelectContent className="max-h-64">{selectHero("")}</SelectContent>
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
          <Dialog open={open}>
            <DialogTrigger
              onClick={() => setOpen(!open)}
              className="h-10 flex w-32 p-2 bg-orange-500 gap-1 text-white rounded-md items-center justify-center"
            >
              <Plus className="w-5" /> New match
            </DialogTrigger>
            <DialogContent className="min-w-fit bg-slate-50 border-none">
              <DialogHeader>
                <DialogTitle>New Match</DialogTitle>
              </DialogHeader>
              <NewMatchForm close={closeDialog} />
            </DialogContent>
          </Dialog>
          <Button
            onClick={async () => {
              await deleteData();
              setTimeout(() => window.location.reload(), 500);
            }}
            className="bg-red-600"
          >
            Delete data
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <HeroDataDisplay role={filterStates.selectRole} data={displayData} />
    </div>
  );
}
