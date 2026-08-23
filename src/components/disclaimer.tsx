import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-lg border border-[#3898ff] bg-[#111d3d]">
        {/* Header */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          className="flex min-h-11 w-full items-center justify-between bg-[#111d3d] px-3 text-left transition-colors hover:bg-[#16264d]"
        >
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3898ff]/15">
              <Info className="h-4 w-4 text-white" />
            </span>

            <span className="text-[12px] font-semibold text-white">
              Important Notes &amp; Disclaimers
            </span>
          </span>

          <ChevronDown
            className={`h-4 w-4 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expanded Content */}
        {isOpen && (
          <div className="border-t border-[#3898ff]/30 bg-[#111d3d] px-4 py-4">
            <ul className="space-y-2.5 text-[12px] leading-[1.5] text-white">
              <li className="flex gap-2.5">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>
                  This calculator provides an estimate of your potential tax
                  savings based on the information provided.
                </span>
              </li>

              <li className="flex gap-2.5">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>
                  Tax calculations are based on the applicable capital gains
                  rules and may vary depending on your individual situation.
                </span>
              </li>

              <li className="flex gap-2.5">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>
                  The results shown are for informational purposes only and
                  should not be considered financial or tax advice.
                </span>
              </li>

              <li className="flex gap-2.5">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>
                  Actual tax liability may differ based on your complete
                  transaction history, income, exemptions, and applicable
                  regulations.
                </span>
              </li>

              <li className="flex gap-2.5">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>
                  Please consult a qualified tax professional before making
                  decisions based on these calculations.
                </span>
              </li>
            </ul>

            <button
              type="button"
              className="mt-3 text-[11px] font-semibold text-white underline underline-offset-2 transition-colors hover:text-[#8fc4ff]"
            >
              Know More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
