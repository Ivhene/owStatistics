import { Maps } from "@/lib/constants";

export function findMaptypeOfMap(mapname: string) {
  const map = Maps.find((m) => m.name === mapname);

  return map ? map.mode : "";
}
