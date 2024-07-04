"use client";
import { Match } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { selectMapTypes } from "@/functions/selectMapper";
import { findMaptypeOfMap } from "@/functions/findMaptypeOfMap";
import { Button } from "../ui/button";
import MapDataDisplay from "./MapDataDisplay";
import { Label } from "../ui/label";

interface HeroDataProps {
  data: Match[];
}

export function MapDataProcessing({ data }: HeroDataProps) {
  const [filterStates, setFilterStates] = useState({
    selectMapType: "control",
    selectRole: "",
  });

  const [displayData, setDisplayData] = useState<Match[]>(data);

  useEffect(() => {
    let matches = data;

    if (filterStates.selectMapType !== "") {
      matches = matches.filter(
        (match) => findMaptypeOfMap(match.map) === filterStates.selectMapType
      );
    }
    if (filterStates.selectRole !== "") {
      matches = matches.filter(
        (match) => match.role === filterStates.selectRole
      );
    }
    setDisplayData(matches);
  }, [filterStates]);

  const handleClearFilters = () => {
    setFilterStates({
      selectMapType: filterStates.selectMapType,
      selectRole: "",
    });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-fit bg-slate-100 p-4">
        <h2 className="pl-2 font-medium text-lg text-slate-700">
          Results on maps
        </h2>
        <p className="m-2 border-b-2 border-slate-200 text-sm text-slate-500 pb-1">
          Result of matches played on a map. The win bar (green on the left)
          means you won the match on this map. The draw bar (yellow in the
          middle) means you drew the match on this map. The loss bar (red on the
          right) means you lost the match on this map.
        </p>
        <div className="w-full h-fit p-2 flex gap-4">
          <div className="flex flex-col gap-2">
            <Label>Select Role</Label>
            <Select
              value={filterStates.selectRole}
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
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select Map Type</Label>
            <Select
              value={filterStates.selectMapType}
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
          </div>
          <Button className="mt-auto mb-0" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
      <MapDataDisplay
        data={displayData}
        role={filterStates.selectRole}
        maptype={filterStates.selectMapType}
      />
    </div>
  );
}
