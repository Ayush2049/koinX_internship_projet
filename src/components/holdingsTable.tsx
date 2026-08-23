import { useMemo, useState } from "react";

import HoldingRow from "@/components/holdingRow";
import { useHoldingSelection } from "@/hooks/useHoldingSelection";
import { useTaxStore } from "@/stores/taxStore";

type SortField = "stcg" | "ltcg";
type SortDirection = "asc" | "desc";

const INITIAL_VISIBLE_ROWS = 4;

export default function HoldingsTable() {
  const holdings = useTaxStore((state) => state.holdings);

  const { isAllSelected, isHoldingSelected, toggleHolding, handleSelectAll } =
    useHoldingSelection();

  const [showAll, setShowAll] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedHoldings = useMemo(() => {
    if (!sortField) {
      return holdings;
    }

    return [...holdings].sort((first, second) => {
      const firstGain =
        sortField === "stcg" ? first.stcg.gain : first.ltcg.gain;

      const secondGain =
        sortField === "stcg" ? second.stcg.gain : second.ltcg.gain;

      return sortDirection === "desc"
        ? secondGain - firstGain
        : firstGain - secondGain;
    });
  }, [holdings, sortField, sortDirection]);

  const visibleHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, INITIAL_VISIBLE_ROWS);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((previousDirection) =>
        previousDirection === "desc" ? "asc" : "desc",
      );

      return;
    }

    setSortField(field);
    setSortDirection("desc");
  };

  if (holdings.length === 0) {
    return (
      <section className="rounded-lg bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-slate-500">No holdings available.</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <h2 className="text-[15px] font-semibold text-[#111827]">Holdings</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          {/* Sticky Table Header */}
          <thead className="sticky top-0 z-20">
            <tr className="border-b border-[#343847] bg-[#0c0d14] text-left shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
              {/* Select All */}
              <th className="w-10 px-3 py-3.5">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all holdings"
                  className="h-4 w-4 cursor-pointer accent-[#1264ff]"
                />
              </th>

              {/* Asset */}
              <th className="px-3 py-3.5 text-[11px] font-medium text-slate-500">
                Asset
              </th>

              {/* Holdings / Average Buy Price */}
              <th className="min-w-[140px] px-3 py-3.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-medium text-slate-500">
                    Holdings
                  </span>

                  <span className="text-[10px] font-medium text-slate-500">
                    Avg Buy Price
                  </span>
                </div>
              </th>

              {/* Current Price */}
              <th className="px-3 py-3.5 text-[11px] font-medium text-slate-500">
                Current Price
              </th>

              {/* Short-Term Gain */}
              <th className="px-3 py-3.5 text-[11px] font-medium text-slate-500">
                <button
                  type="button"
                  onClick={() => handleSort("stcg")}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <span>Short-Term Gain</span>

                  {sortField === "stcg" && (
                    <span
                      aria-hidden="true"
                      className="text-[12px] font-semibold text-[#3898ff]"
                    >
                      {sortDirection === "desc" ? "↓" : "↑"}
                    </span>
                  )}
                </button>
              </th>

              {/* Long-Term Gain */}
              <th className="px-3 py-3.5 text-[11px] font-medium text-slate-500">
                <button
                  type="button"
                  onClick={() => handleSort("ltcg")}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <span>Long-Term Gain</span>

                  {sortField === "ltcg" && (
                    <span
                      aria-hidden="true"
                      className="text-[12px] font-semibold text-[#3898ff]"
                    >
                      {sortDirection === "desc" ? "↓" : "↑"}
                    </span>
                  )}
                </button>
              </th>

              {/* Amount to Sell */}
              <th className="px-3 py-3.5 text-[11px] font-medium text-slate-500">
                Amount to Sell
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleHoldings.map((holding) => (
              <HoldingRow
                key={holding.id}
                holding={holding}
                isSelected={isHoldingSelected(holding.id)}
                onToggle={toggleHolding}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* View All */}
      {holdings.length > INITIAL_VISIBLE_ROWS && (
        <div className="flex justify-center border-t border-slate-100 py-3">
          <button
            type="button"
            onClick={() => setShowAll((previous) => !previous)}
            className="text-[11px] font-medium text-[#1264ff] underline underline-offset-2 transition-colors hover:text-[#3898ff]"
          >
            {showAll ? "View less" : "View all"}
          </button>
        </div>
      )}
    </section>
  );
}
