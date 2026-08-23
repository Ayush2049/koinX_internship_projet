import type { AfterHarvestingResult, CapitalGains, Holding } from "@/types/tax";

function applyGain(
  category: "stcg" | "ltcg",
  gain: number,
  result: CapitalGains,
) {
  if (gain > 0) {
    result[category].profits += gain;
  } else if (gain < 0) {
    result[category].losses += Math.abs(gain);
  }
}

export function calculateCapitalGains(
  capitalGains: CapitalGains,
  holdings: Holding[],
  selectedHoldingIds: Set<string>,
): AfterHarvestingResult {
  const result: CapitalGains = {
    stcg: {
      profits: capitalGains.stcg.profits,
      losses: capitalGains.stcg.losses,
    },
    ltcg: {
      profits: capitalGains.ltcg.profits,
      losses: capitalGains.ltcg.losses,
    },
  };

  for (const holding of holdings) {
    if (!selectedHoldingIds.has(holding.id)) {
      continue;
    }

    applyGain("stcg", holding.stcg.gain, result);
    applyGain("ltcg", holding.ltcg.gain, result);
  }

  const stcgNet = result.stcg.profits - result.stcg.losses;
  const ltcgNet = result.ltcg.profits - result.ltcg.losses;

  return {
    stcg: result.stcg,
    ltcg: result.ltcg,
    stcgNet,
    ltcgNet,
    realisedCapitalGains: stcgNet + ltcgNet,
  };
}
