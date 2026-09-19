import Link from 'next/link';

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a href="https://www.iis-hensemberger.edu.it" target="_blank" rel="noreferrer" className="p-4 rounded-lg border glass">
        <h4 className="text-cyan-300">IIS P. Hensemberger Monza</h4>
        <p className="text-sm text-muted-foreground">Sito ufficiale</p>
      </a>
      <a href="https://www.spaggiari.eu" target="_blank" rel="noreferrer" className="p-4 rounded-lg border glass">
        <h4 className="text-cyan-300">ClasseViva (Spaggiari)</h4>
        <p className="text-sm text-muted-foreground">Portale scolastico</p>
      </a>
    </div>
  );
}
