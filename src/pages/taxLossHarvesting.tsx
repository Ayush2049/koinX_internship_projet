import { useEffect } from "react";

import CapitalGainsCard from "@/components/capitalGainsCard";
import Disclaimer from "@/components/disclaimer";
import Header from "@/components/header";
import HoldingsTable from "@/components/holdingsTable";
import { useCapitalGains } from "@/hooks/useCapitalGains";
import { useTaxStore } from "@/stores/taxStore";

export default function TaxLossHarvesting() {
  const loadData = useTaxStore((state) => state.loadData);
  const isLoading = useTaxStore((state) => state.isLoading);
  const error = useTaxStore((state) => state.error);

  const { preHarvesting, afterHarvesting, savings, hasSavings } =
    useCapitalGains();

  useEffect(() => {
    void loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#f3f7fb]">
        <Header />

        <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
          <p className="text-base text-slate-600">
            Loading tax harvesting data...
          </p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#f3f7fb]">
        <Header />

        <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
          <p className="text-base text-red-500">{error}</p>
        </main>
      </div>
    );
  }

  if (!preHarvesting || !afterHarvesting) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#f3f7fb]">
      <Header />

      <main className="mx-auto w-full px-6 py-6 sm:px-8 lg:px-10">
        {/* Page heading */}
        <div className="mb-5 flex items-center gap-3">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            Tax Harvesting
          </h1>

          {/* How It Works Tooltip */}
          <div className="group relative">
            <button
              type="button"
              className="text-[11px] font-medium text-[#1264ff] underline underline-offset-2"
            >
              How it works?
            </button>

            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-[260px] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {/* Tooltip Arrow */}
              <div className="absolute bottom-[-5px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#172033]" />

              {/* Tooltip Body */}
              <div className="relative rounded-md bg-[#172033] px-3 py-2.5 text-[11px] leading-[1.4] text-white shadow-lg">
                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh
                semper mattis scelerisque tellus. Vel mattis diam duis
                consectetur.
                <span className="ml-1 cursor-pointer text-[#6ea8ff] underline">
                  Know More
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer />

        {/* Capital Gains Cards */}
        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <CapitalGainsCard
            title="Pre Harvesting"
            data={preHarvesting}
            variant="pre"
          />

          <CapitalGainsCard
            title="After Harvesting"
            data={afterHarvesting}
            variant="after"
            savings={hasSavings ? savings : 0}
          />
        </section>

        {/* Holdings */}
        <section className="mt-5">
          <HoldingsTable />
        </section>
      </main>
    </div>
  );
}
