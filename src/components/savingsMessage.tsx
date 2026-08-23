interface SavingsMessageProps {
  amount: number;
}

export default function SavingsMessage({ amount }: SavingsMessageProps) {
  return (
    <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-white">
      <span
        aria-hidden="true"
        className="flex h-6 w-6 shrink-0 items-center justify-center text-[18px] leading-none"
      >
        🎉
      </span>

      <span>
        You are going to save up to{" "}
        <span className="font-semibold">₹{amount.toLocaleString("en-IN")}</span>
      </span>
    </div>
  );
}
