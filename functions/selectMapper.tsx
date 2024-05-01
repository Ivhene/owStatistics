import { SelectItem } from "@/components/ui/select";
import { Heroes, Maps } from "@/lib/constants";

export function selectHero() {
  let res = [];

  for (const hero of Heroes) {
    res.push(
      <SelectItem key={hero.name} value={hero.name}>
        {hero.name}
      </SelectItem>
    );
  }
  return res;
}

export function selectMaps() {
  let res = [];

  for (const maps of Maps) {
    res.push(
      <SelectItem key={maps.name} value={maps.name}>
        {maps.name}
      </SelectItem>
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
