import { SiteConfig } from "../types";

export const SITE: SiteConfig = {
  name: "Vihanga Sathsara",
  domain: "vihanga.it",
  url: "https://vihanga.it",
  email: "contact@vihanga.it",
  contactUrl: "mailto:contact@vihanga.it",
  gmailUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=contact@vihanga.it",
  location: "Monza, Italia IT",
  tagline: "PERCORSO & PORTFOLIO",
  headline: "Vihanga Sathsara",
  subtitle:
    "Studio Informatica e Telecomunicazioni presso IIS P. Hensemberger Monza, a Monza. Mi interessa capire come funzionano i sistemi e costruire software utile.",
  school: {
    name: "IIS P. Hensemberger Monza",
    course: "Informatica e Telecomunicazioni",
    description:
      "Un percorso tecnico tra programmazione, sistemi operativi, reti e progettazione di soluzioni digitali.",
    officialSite: "https://hensemberger.edu.it",
    classeViva: "https://cvv.spaggiari.eu",
  },
  focusAreas: [
    "Linux Systems",
    "Cybersecurity",
    "Networking & TCP/IP",
    "Python & Node.js",
    "Web Development",
    "React / Next.js",
  ] as const,
  socials: {
    github: "https://github.com/0xVihanga",
    linkedin: "https://www.linkedin.com/in/0x_vihanga",
  },
  bio: "Studio Informatica e Telecomunicazioni presso IIS P. Hensemberger Monza, a Monza. Mi interessa capire come funzionano i sistemi e costruire software utile.",
};
