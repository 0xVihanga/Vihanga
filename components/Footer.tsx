import { SITE } from "../config/site";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900/90 py-8 text-xs text-zinc-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 sm:flex-row lg:px-8">
        <p className="tracking-tight text-zinc-400">
          &copy; 2026 {SITE.name}. All rights reserved.
        </p>
        <p className="font-mono text-zinc-500">{SITE.location}</p>
      </div>
    </footer>
  );
}
