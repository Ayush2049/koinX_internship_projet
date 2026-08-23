export default function Header() {
  return (
    <header className="h-16 w-full border-b border-slate-200 bg-white">
      <div className="flex h-full w-full items-center justify-between px-6 sm:px-8 lg:px-10">
        <a href="/" aria-label="KoinX home" className="flex items-center">
          <img
            src="/koinx-logo.png"
            alt="KoinX"
            className="h-[85px] w-auto object-contain"
          />
        </a>

        <button
          type="button"
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-[1.5px] w-4 bg-current" />
            <span className="block h-[1.5px] w-4 bg-current" />
          </span>
        </button>
      </div>
    </header>
  );
}
