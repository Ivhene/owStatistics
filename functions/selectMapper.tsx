import { SelectItem } from "@/components/ui/select";
import { Heroes, Maps } from "@/lib/constants";
import { Match, MatchupWithMaps } from "@/lib/types";

export function selectHero(role: string, matchups?: MatchupWithMaps[]) {
  const heroes =
    role === "" ? Heroes : Heroes.filter((hero) => hero.role === role);

  let res = [];

  for (const hero of heroes) {
    const matchupApperances = matchups
      ? matchups?.filter((matchup) => matchup.heroPlayed.name === hero.name)
          .length
      : -1;
    res.push(
      <div className="flex justify-between items-center" key={hero.name}>
        <SelectItem className="flex-1" value={hero.name}>
          {hero.name}
        </SelectItem>
        {matchupApperances > 0 && (
          <span className="ml-2 text-xs italic">{matchupApperances}</span>
        )}
      </div>
    );
  }
  return res;
}

export function selectMaps(maptype: string, matches?: Match[]) {
  let res = [];
  let maps = Maps.sort((a, b) => (a.name > b.name ? 1 : -1));

  if (maptype !== "") {
    maps = maps.filter((map) => map.mode === maptype);
  }

  for (const map of maps) {
    const matchesOnMap = matches
      ? matches.filter((match) => match.map.name === map.name).length
      : -1;
    res.push(
      <div className="flex justify-between items-center" key={map.name}>
        <SelectItem key={map.name} value={map.name}>
          {map.name}
        </SelectItem>
        {matchesOnMap > 0 && (
          <span className="ml-2 text-xs italic">{matchesOnMap}</span>
        )}
      </div>
    );
  }

  return res;
}

export function selectMapTypes() {
  let res = [];

  let maptype = Maps.map((map) => map.mode);

  // Use Set to get unique values
  let maptypes = Array.from(new Set(maptype));

  for (const type of maptypes) {
    res.push(
      <SelectItem key={type} value={type}>
        {type}
      </SelectItem>
    );
  }

  return res;
}

export function selectResult() {
  const results = ["win", "draw", "loss"];

  let res = [];

  for (const result of results) {
    res.push(
      <SelectItem
        className="flex items-center space-x-2"
        key={result}
        value={result}
      >
        {result}
      </SelectItem>
    );
  }
  return res;
}
