type SkillBadgeProps = {
  name: string;
};

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-sm text-cyan-300 border border-slate-700">
      {name}
    </span>
  );
}
