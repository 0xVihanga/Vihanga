import { SITE } from "../config/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#top"
          className="group inline-flex items-center font-mono text-sm font-medium text-zinc-300 transition-colors hover:text-white"
        >
          <span className="text-zinc-500 transition-colors group-hover:text-zinc-400">&lt;</span>
          <span>{SITE.domain}</span>
          <span className="ml-1 text-zinc-500 transition-colors group-hover:text-zinc-400">/&gt;</span>
        </a>

        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/90 bg-zinc-900/70 px-3 py-1 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Studente attivo</span>
        </div>
      </div>
    </header>
  );
}