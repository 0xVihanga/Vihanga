export type NavLink = {
  title: string;
  href: string;
};

export type Skill = {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  repo?: string;
  demo?: string;
};
