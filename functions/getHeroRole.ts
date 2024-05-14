import { Heroes } from "@/lib/constants";

export function getHeroRole(name: string) {
  for (const hero of Heroes) {
    if (hero.name === name) {
      return hero.role;
    }
  }
  return "";
}
