import { SITE } from "../config/site";

export default function EducationCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-md">
      <div>
        <p className="font-mono text-xs font-medium tracking-widest text-zinc-500">
          EDUCAZIONE
        </p>

        <h2 className="mt-4 text-xl font-semibold tracking-tight text-zinc-100">
          {SITE.school.name}
        </h2>

        <p className="mt-1.5 text-sm font-medium text-zinc-400">
          {SITE.school.course}
        </p>

        <p className="mt-6 text-sm leading-relaxed text-zinc-400">
          {SITE.school.description}
        </p>
      </div>
    </div>
  );
}
