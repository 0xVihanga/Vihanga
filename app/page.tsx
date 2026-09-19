import Header from "../components/Header";
import { SITE } from "../config/site";

const skills = [
  "Linux Systems",
  "Cybersecurity",
  "Networking & TCP/IP",
  "Python & Node.js",
  "Web Development",
  "React / Next.js",
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-grow px-6 py-16 lg:px-8 lg:py-24">
        <section className="max-w-3xl border-b border-zinc-800/80 pb-16 lg:pb-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">Percorso &amp; portfolio</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">{SITE.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Studio <span className="text-zinc-200">{SITE.school.course}</span> presso {SITE.school.name}, a Monza.
            Mi interessa capire come funzionano i sistemi e costruire software utile.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition-all hover:bg-white"
            >
              Contattami
            </a>
            <a
              href={SITE.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/80 px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-zinc-100"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href={SITE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/80 px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-zinc-100"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>
        </section>

        <section className="grid gap-5 border-b border-zinc-800/80 py-16 md:grid-cols-2 lg:py-20">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Educazione</p>
            <h2 className="mt-5 text-lg font-semibold text-zinc-100">{SITE.school.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{SITE.school.course}</p>
            <p className="mt-6 text-sm leading-6 text-zinc-500">Un percorso tecnico tra programmazione, sistemi operativi, reti e progettazione di soluzioni digitali.</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Area di focus</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => <span key={skill} className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-xs text-zinc-300">{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Link utili</p>
          <h2 className="mt-4 text-xl font-semibold text-zinc-100">Hensemberger portal</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={SITE.school.officialSite}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-sm text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-zinc-100"
            >
              <span>Sito Ufficiale IIS Hensemberger</span>
              <span className="text-zinc-500 transition-transform group-hover:translate-x-0.5"><ArrowIcon /></span>
            </a>
            <a
              href={SITE.school.classeViva}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-sm text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-zinc-100"
            >
              <span>Registro Elettronico (ClasseViva)</span>
              <span className="text-zinc-500 transition-transform group-hover:translate-x-0.5"><ArrowIcon /></span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 sm:flex-row lg:px-8">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="font-mono text-slate-600">{SITE.location}</p>
        </div>
      </footer>
    </div>
  );
}