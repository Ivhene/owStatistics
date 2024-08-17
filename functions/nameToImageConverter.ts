import { Heroes, Maps } from "@/lib/constants";

export function getHeroImage(name: string) {
  return Heroes.find((hero) => hero.name === name)?.image;
}

export function getMapImage(name: string) {
  return Maps.find((map) => map.name === name)?.image;
}
