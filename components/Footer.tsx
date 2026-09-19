import { SITE } from '../config/site';

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
        <div>{SITE.location} — {SITE.domain}</div>
      </div>
    </footer>
  );
}
