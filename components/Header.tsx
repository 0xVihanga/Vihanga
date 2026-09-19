import { SITE } from "../config/site";

export default function Header() {
  return (
    <header className="border-b border-zinc-800/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#top" className="font-mono text-sm text-zinc-300 transition-colors hover:text-zinc-100 hover:underline hover:underline-offset-4">
          &lt;{SITE.domain} /&gt;
        </a>

        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span>Studente attivo</span>
        </div>
      </div>
    </header>
  );
}