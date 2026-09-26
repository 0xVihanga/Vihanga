export type QuickLinkItem = {
  title: string;
  href: string;
};

export type SchoolInfo = {
  name: string;
  course: string;
  description: string;
  officialSite: string;
  classeViva: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
};

export type SiteConfig = {
  name: string;
  domain: string;
  url: string;
  email: string;
  contactUrl: string;
  gmailUrl: string;
  location: string;
  tagline: string;
  headline: string;
  subtitle: string;
  school: SchoolInfo;
  focusAreas: readonly string[];
  socials: SocialLinks;
  bio: string;
};
