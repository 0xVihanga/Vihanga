type Props = {
  title: string;
  children: React.ReactNode;
};

export default function AcademicCard({ title, children }: Props) {
  return (
    <div className="p-4 rounded-lg border border-slate-800 glass">
      <h3 className="text-lg font-semibold text-cyan-300">{title}</h3>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
