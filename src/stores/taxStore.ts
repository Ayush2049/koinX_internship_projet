import { create } from "zustand";

import { getCapitalGains, getHoldings } from "@/services/mockApi";
import type { CapitalGains, Holding } from "@/types/tax";

interface TaxStore {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  selectedHoldingIds: Set<string>;

  isLoading: boolean;
  error: string | null;

  loadData: () => Promise<void>;
  toggleHolding: (holdingId: string) => void;
  selectAllHoldings: () => void;
  clearAllHoldings: () => void;
}

export const useTaxStore = create<TaxStore>((set) => ({
  holdings: [],
  capitalGains: null,
  selectedHoldingIds: new Set<string>(),

  isLoading: false,
  error: null,

  loadData: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const [capitalGains, holdings] = await Promise.all([
        getCapitalGains(),
        getHoldings(),
      ]);

      set({
        capitalGains,
        holdings,
        isLoading: false,
      });
    } catch {
      set({
        isLoading: false,
        error: "Failed to load tax harvesting data.",
      });
    }
  },

  toggleHolding: (holdingId) => {
    set((state) => {
      const selectedHoldingIds = new Set(state.selectedHoldingIds);

      if (selectedHoldingIds.has(holdingId)) {
        selectedHoldingIds.delete(holdingId);
      } else {
        selectedHoldingIds.add(holdingId);
      }

      return {
        selectedHoldingIds,
      };
    });
  },

  selectAllHoldings: () => {
    set((state) => ({
      selectedHoldingIds: new Set(state.holdings.map((holding) => holding.id)),
    }));
  },

  clearAllHoldings: () => {
    set({
      selectedHoldingIds: new Set<string>(),
    });
  },
}));
