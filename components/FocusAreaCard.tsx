import { SITE } from "../config/site";

export default function FocusAreaCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-md">
      <div>
        <p className="font-mono text-xs font-medium tracking-widest text-zinc-500">
          AREA DI FOCUS
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {SITE.focusAreas.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-lg border border-zinc-800/90 bg-zinc-900/70 px-3 py-1.5 font-mono text-xs font-medium text-zinc-300 shadow-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
