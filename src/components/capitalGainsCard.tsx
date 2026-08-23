import type { AfterHarvestingResult } from "@/types/tax";
import SavingsMessage from "@/components/savingsMessage";

interface CapitalGainsCardProps {
  title: string;
  data: AfterHarvestingResult;
  variant: "pre" | "after";
  savings?: number;
}

function formatCurrency(value: number) {
  const roundedValue = Math.round(value);

  if (roundedValue < 0) {
    return `- ₹${Math.abs(roundedValue).toLocaleString("en-IN")}`;
  }

  return `₹${roundedValue.toLocaleString("en-IN")}`;
}

export default function CapitalGainsCard({
  title,
  data,
  variant,
  savings = 0,
}: CapitalGainsCardProps) {
  const isAfter = variant === "after";

  return (
    <section
      className={`rounded-xl border px-5 py-6 sm:px-6 ${
        isAfter
          ? "border-[#1264ff]/20 bg-gradient-to-br from-[#3d9bf3] to-[#0868f5] text-white shadow-md shadow-blue-500/10"
          : "border-slate-200 bg-white text-[#111827] shadow-sm"
      }`}
    >
      {/* Card Title */}
      <h2
        className={`text-[15px] font-semibold ${
          isAfter ? "text-white" : "text-[#111827]"
        }`}
      >
        {title}
      </h2>

      {/* Capital Gains Breakdown */}
      <div className="mt-5 grid grid-cols-[1fr_1fr_1fr] items-center gap-x-4 gap-y-3">
        {/* Empty label column */}
        <div />

        {/* Short-Term */}
        <div
          className={`pl-1 text-right text-[12px] font-semibold ${
            isAfter ? "text-white/90" : "text-slate-500"
          }`}
        >
          Short-term
        </div>

        {/* Long-Term */}
        <div
          className={`text-right text-[12px] font-semibold ${
            isAfter ? "text-white/90" : "text-slate-500"
          }`}
        >
          Long-term
        </div>

        {/* Profits */}
        <span
          className={`text-[12px] font-medium ${
            isAfter ? "text-white/90" : "text-slate-600"
          }`}
        >
          Profits
        </span>

        <span className="pl-1 text-right text-[12px]">
          {formatCurrency(data.stcg.profits)}
        </span>

        <span className="text-right text-[12px]">
          {formatCurrency(data.ltcg.profits)}
        </span>

        {/* Losses */}
        <span
          className={`text-[12px] font-medium ${
            isAfter ? "text-white/90" : "text-slate-600"
          }`}
        >
          Losses
        </span>

        <span className="pl-1 text-right text-[12px]">
          {formatCurrency(-data.stcg.losses)}
        </span>

        <span className="text-right text-[12px]">
          {formatCurrency(-data.ltcg.losses)}
        </span>

        {/* Net Capital Gains */}
        <span className="text-[12px] font-semibold">Net Capital Gains</span>

        <span className="pl-1 text-right text-[12px] font-semibold">
          {formatCurrency(data.stcgNet)}
        </span>

        <span className="text-right text-[12px] font-semibold">
          {formatCurrency(data.ltcgNet)}
        </span>
      </div>

      {/* Realised / Effective Capital Gains */}
      <div
        className={`mt-7 flex items-baseline gap-4 border-t pt-5 ${
          isAfter ? "border-white/20" : "border-slate-100"
        }`}
      >
        <span className="text-[14px] font-semibold">
          {isAfter ? "Effective Capital Gains:" : "Realised Capital Gains:"}
        </span>

        <span className="text-[22px] font-bold tracking-tight">
          {formatCurrency(data.realisedCapitalGains)}
        </span>
      </div>

      {/* Savings */}
      {isAfter && savings > 0 && <SavingsMessage amount={savings} />}
    </section>
  );
}
