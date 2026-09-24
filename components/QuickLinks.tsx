import { SITE } from "../config/site";
import { ChevronRight } from "lucide-react";

export default function QuickLinks() {
  const links = [
    {
      title: "Sito Ufficiale IIS Hensemberger",
      href: SITE.school.officialSite,
    },
    {
      title: "Registro Elettronico (ClasseViva)",
      href: SITE.school.classeViva,
    },
  ];

  return (
    <section className="py-16 lg:py-20">
      <p className="font-mono text-xs font-medium tracking-widest text-zinc-500">
        LINK UTILI
      </p>

      <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl">
        Hensemberger portal
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 text-sm font-medium text-zinc-300 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-white hover:shadow-md"
          >
            <span className="font-medium tracking-tight text-zinc-200 transition-colors group-hover:text-white">
              {link.title}
            </span>
            <span className="text-zinc-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-zinc-200">
              <ChevronRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
