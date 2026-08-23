import { useTaxStore } from "@/stores/taxStore";

export function useHoldingSelection() {
  const holdings = useTaxStore((state) => state.holdings);
  const selectedHoldingIds = useTaxStore((state) => state.selectedHoldingIds);

  const toggleHolding = useTaxStore((state) => state.toggleHolding);

  const selectAllHoldings = useTaxStore((state) => state.selectAllHoldings);

  const clearAllHoldings = useTaxStore((state) => state.clearAllHoldings);

  const selectedCount = selectedHoldingIds.size;

  const isAllSelected =
    holdings.length > 0 && selectedHoldingIds.size === holdings.length;

  const isHoldingSelected = (holdingId: string) =>
    selectedHoldingIds.has(holdingId);

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearAllHoldings();
      return;
    }

    selectAllHoldings();
  };

  return {
    selectedCount,
    isAllSelected,
    isHoldingSelected,
    toggleHolding,
    handleSelectAll,
  };
}
