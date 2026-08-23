import { useMemo } from "react";

import { calculateCapitalGains } from "@/utils/calculateCapitalGains";
import { useTaxStore } from "@/stores/taxStore";

export function useCapitalGains() {
  const capitalGains = useTaxStore((state) => state.capitalGains);
  const holdings = useTaxStore((state) => state.holdings);
  const selectedHoldingIds = useTaxStore((state) => state.selectedHoldingIds);

  const afterHarvesting = useMemo(() => {
    if (!capitalGains) {
      return null;
    }

    return calculateCapitalGains(capitalGains, holdings, selectedHoldingIds);
  }, [capitalGains, holdings, selectedHoldingIds]);

  const preRealisedCapitalGains = capitalGains
    ? capitalGains.stcg.profits -
      capitalGains.stcg.losses +
      capitalGains.ltcg.profits -
      capitalGains.ltcg.losses
    : 0;

  const postRealisedCapitalGains = afterHarvesting?.realisedCapitalGains ?? 0;

  const savings = Math.max(
    0,
    preRealisedCapitalGains - postRealisedCapitalGains,
  );

  return {
    preHarvesting: capitalGains
      ? {
          stcg: capitalGains.stcg,
          ltcg: capitalGains.ltcg,

          stcgNet: capitalGains.stcg.profits - capitalGains.stcg.losses,

          ltcgNet: capitalGains.ltcg.profits - capitalGains.ltcg.losses,

          realisedCapitalGains: preRealisedCapitalGains,
        }
      : null,

    afterHarvesting,

    savings,

    hasSavings: savings > 0,
  };
}
