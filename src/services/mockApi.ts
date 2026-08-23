import { capitalGainsData } from "@/data/capitalGains";
import { holdingsData } from "@/data/holdings";
import type { CapitalGains, Holding } from "@/types/tax";

export function getCapitalGains(): Promise<CapitalGains> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(capitalGainsData);
    }, 500);
  });
}

export function getHoldings(): Promise<Holding[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdingsData);
    }, 500);
  });
}