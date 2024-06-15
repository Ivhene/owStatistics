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

interface HeroDataProps {
  data: Match[];
}

export function MapDataProcessing({ data }: HeroDataProps) {
  const [filterStates, setFilterStates] = useState({
    selectMapType: "",
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
    setDisplayData(matches);
  }, [filterStates]);

  const handleClearFilters = () => {
    setFilterStates({
      selectMapType: "",
      selectRole: "",
    });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-fit bg-slate-100 p-4">
        <div className="w-full h-fit p-2 flex gap-4">
          <Select
            value={filterStates.selectRole}
            onValueChange={(value) => {
              setFilterStates((prev) => ({
                ...prev,
                selectRole: value,
              }));
            }}
            defaultValue="tank"
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
          <Button onClick={handleClearFilters}>Clear Filters</Button>
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
