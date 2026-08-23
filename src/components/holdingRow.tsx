import type { ReactNode } from "react";

import type { Holding } from "@/types/tax";

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (holdingId: string) => void;
}

function formatNumber(value: number) {
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 6,
  });
}

function formatCurrency(value: number) {
  const absoluteValue = Math.abs(value);

  if (absoluteValue === 0) {
    return "₹0";
  }

  if (absoluteValue < 1) {
    const formatted = absoluteValue.toLocaleString("en-IN", {
      maximumFractionDigits: 6,
    });

    return value < 0 ? `-₹${formatted}` : `+₹${formatted}`;
  }

  const roundedValue = Math.round(absoluteValue);
  const formatted = roundedValue.toLocaleString("en-IN");

  return value < 0 ? `-₹${formatted}` : `+₹${formatted}`;
}

function formatFullCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function ValueTooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: string;
}) {
  return (
    <div className="group relative inline-flex max-w-full">
      <div className="cursor-help">{children}</div>

      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[250px] -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
        {/* Arrow */}
        <div className="absolute bottom-[-5px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#172033]" />

        {/* Tooltip */}
        <div className="relative rounded-md bg-[#172033] px-3 py-2 text-[10px] font-medium leading-[1.45] text-white shadow-xl">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function HoldingRow({
  holding,
  isSelected,
  onToggle,
}: HoldingRowProps) {
  const holdingAmount = formatNumber(holding.totalHolding);

  const averageBuyPrice = formatFullCurrency(holding.averageBuyPrice);

  const currentPrice = formatFullCurrency(holding.currentPrice);

  const stcgGain = formatFullCurrency(Math.abs(holding.stcg.gain));

  const ltcgGain = formatFullCurrency(Math.abs(holding.ltcg.gain));

  return (
    <tr
      className={`border-t border-slate-100 transition-colors ${
        isSelected ? "bg-[#eef6ff]" : "bg-white"
      }`}
    >
      {/* Checkbox */}
      <td className="px-3 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(holding.id)}
          aria-label={`Select ${holding.coin}`}
          className="h-4 w-4 cursor-pointer accent-[#1264ff]"
        />
      </td>

      {/* Asset */}
      <td className="px-3 py-3">
        <ValueTooltip content={`${holding.coinName} (${holding.coin})`}>
          <div className="flex items-center gap-2.5">
            <img
              src={holding.logo}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#111827]">
                {holding.coin}
              </p>

              <p className="max-w-[150px] truncate text-[10px] text-slate-400">
                {holding.coinName}
              </p>
            </div>
          </div>
        </ValueTooltip>
      </td>

      {/* Holdings / Average Buy Price */}
      <td className="px-3 py-3">
        <div className="flex flex-col">
          {/* Holdings */}
          <ValueTooltip
            content={`You currently hold ${holdingAmount} ${holding.coinName} (${holding.coin}).`}
          >
            <p className="text-[11px] font-medium text-[#111827]">
              {holdingAmount} {holding.coin}
            </p>
          </ValueTooltip>

          {/* Average Buy Price */}
          <ValueTooltip
            content={`Your average purchase price was ${averageBuyPrice} per ${holding.coin}.`}
          >
            <p className="mt-0.5 text-[10px] text-slate-400">
              {averageBuyPrice}
            </p>
          </ValueTooltip>
        </div>
      </td>

      {/* Current Price */}
      <td className="px-3 py-3">
        <ValueTooltip
          content={`Current market price: ${currentPrice} per ${holding.coin}.`}
        >
          <p className="text-[11px] font-medium text-[#111827]">
            {currentPrice}
          </p>
        </ValueTooltip>
      </td>

      {/* Short-Term Gain */}
      <td className="px-3 py-3">
        <div className="flex flex-col">
          <ValueTooltip
            content={
              holding.stcg.gain < 0
                ? `Short-term capital loss: ${stcgGain} on ${formatNumber(
                    holding.stcg.balance,
                  )} ${holding.coin}.`
                : `Short-term capital gain: ${stcgGain} on ${formatNumber(
                    holding.stcg.balance,
                  )} ${holding.coin}.`
            }
          >
            <p
              className={`text-[11px] font-medium ${
                holding.stcg.gain < 0 ? "text-[#ef4444]" : "text-[#16a34a]"
              }`}
            >
              {formatCurrency(holding.stcg.gain)}
            </p>
          </ValueTooltip>

          <ValueTooltip
            content={`Short-term balance: ${formatNumber(
              holding.stcg.balance,
            )} ${holding.coin}.`}
          >
            <p className="mt-0.5 text-[10px] text-slate-400">
              {formatNumber(holding.stcg.balance)} {holding.coin}
            </p>
          </ValueTooltip>
        </div>
      </td>

      {/* Long-Term Gain */}
      <td className="px-3 py-3">
        <div className="flex flex-col">
          <ValueTooltip
            content={
              holding.ltcg.gain < 0
                ? `Long-term capital loss: ${ltcgGain} on ${formatNumber(
                    holding.ltcg.balance,
                  )} ${holding.coin}.`
                : `Long-term capital gain: ${ltcgGain} on ${formatNumber(
                    holding.ltcg.balance,
                  )} ${holding.coin}.`
            }
          >
            <p
              className={`text-[11px] font-medium ${
                holding.ltcg.gain < 0 ? "text-[#ef4444]" : "text-[#16a34a]"
              }`}
            >
              {formatCurrency(holding.ltcg.gain)}
            </p>
          </ValueTooltip>

          <ValueTooltip
            content={`Long-term balance: ${formatNumber(
              holding.ltcg.balance,
            )} ${holding.coin}.`}
          >
            <p className="mt-0.5 text-[10px] text-slate-400">
              {formatNumber(holding.ltcg.balance)} {holding.coin}
            </p>
          </ValueTooltip>
        </div>
      </td>

      {/* Amount to Sell */}
      <td className="px-3 py-3">
        {isSelected ? (
          <ValueTooltip
            content={`You have selected ${holdingAmount} ${holding.coinName} (${holding.coin}) to sell.`}
          >
            <p className="text-[11px] font-medium text-[#111827]">
              {holdingAmount} {holding.coin}
            </p>
          </ValueTooltip>
        ) : (
          <p className="text-[11px] font-medium text-[#111827]">-</p>
        )}
      </td>
    </tr>
  );
}
