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
        <div className="bg-main_background w-fit flex flex-col items-center justify-center p-4 gap-4 rounded-xl">
          <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
            Match {match.matchID}: {match.map}
          </h2>
          <Image
            src={getMapImage(match.map) ?? ""}
            alt="Image of the map"
            width={450}
            height={10}
            className="rounded-xl"
          />
        </div>
        <div className="bg-main_background flex flex-col items-center justify-center p-4 gap-4 rounded-xl w-72">
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
        <div className="bg-main_background flex-grow flex flex-col items-center  p-4 gap-4 rounded-xl">
          <h2 className="text-2xl text-overwatch_blue_main font-bold text-center">
            Heroes played ({heroPlayedData.length})
          </h2>
        </div>
      </div>
    </div>
  );
}
