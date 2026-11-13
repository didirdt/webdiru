export const LINK_ICONS = [
  "github",
  "linkedin",
  "x",
  "mail",
  "globe",
  "dribbble",
] as const;

export type LinkIcon = (typeof LINK_ICONS)[number];

export type SiteLink = {
  label: string;
  href: string;
  icon: LinkIcon;
};

export type SkillGroup = {
  title: string;
  note: string;
  items: string[];
};

/**
 * Single source of truth for everything that is "about you".
 * Edit this file to make the site yours.
 */
export const site = {
  name: "Didi Rudiat",
  initials: "DR",
  role: "Full-Stack Software Engineer",
  location: "Bandung, Indonesia",
  availability: "Open to new opportunities",
  email: "Didi.RudiatD12@gmail.com",
  phone: "+62 838 2200 1125",
  /** Canonical origin of the deployed site. Used for metadata / sitemap. */
  url: "https://didiru.web.id",
  /** Path to the CV PDF, served from /public. */
  cv: "/cv-didi-rudiat.pdf",
  /** Hard-coded on purpose: `new Date()` is not allowed during prerender. */
  year: 2026,
  headline: "I build complete web products — from database schema to interface.",
  intro:
    "I'm a full-stack engineer based in Bandung, Indonesia, with eight years of experience shipping products for studios, startups, and enterprise clients. Most of my work is Ruby on Rails and PostgreSQL on the back end with JavaScript on the front, deployed on AWS — and I care about the boring parts that make software hold up: clear structure, fast pages, and code the next person can read.",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/didirdt",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/didi-rudiat-341448b4",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:Didi.RudiatD12@gmail.com",
      icon: "mail",
    },
  ] satisfies SiteLink[],
} as const;

/**
 * The expertise shown in the "Expertise" section, grouped the way the CV
 * groups it. Edit freely — the section renders whatever is in this array.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    note: "Primary day-to-day languages",
    items: ["Ruby", "JavaScript", "PHP", "Go", "C#", "Java", "VB.NET"],
  },
  {
    title: "Frameworks",
    note: "Web, mobile and service back ends",
    items: [
      "Ruby on Rails",
      "Node.js",
      "React",
      "Vue.js",
      ".NET 8",
      "Flutter",
      "React Native",
    ],
  },
  {
    title: "Web & Front End",
    note: "Interfaces, asset pipelines and admin tooling",
    items: [
      "HTML",
      "SCSS",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Metronic 7",
      "DataTables",
      "Webpack",
      "Video.js",
    ],
  },
  {
    title: "Databases",
    note: "Relational, document and in-memory stores",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ElasticSearch"],
  },
  {
    title: "APIs & Integrations",
    note: "Service boundaries and third-party services",
    items: [
      "RESTful API",
      "Sidekiq",
      "Twilio",
      "Gmail API",
      "Payment Gateway",
      "FFmpeg",
      "HLS Streaming",
    ],
  },
  {
    title: "Server & Infrastructure",
    note: "Where the software actually runs",
    items: [
      "AWS EC2",
      "AWS Lightsail",
      "DigitalOcean Droplets",
      "Google Cloud Platform",
      "IDCloudHost",
      "Linux",
      "macOS",
      "Windows",
    ],
  },
  {
    title: "Engineering Practice",
    note: "How the work gets designed and verified",
    items: [
      "UML",
      "Data Flow Diagram",
      "Flowchart",
      "Selenium",
      "Postman",
      "Git",
      "Agile / Scrum",
    ],
  },
  {
    title: "Also",
    note: "Beyond the code",
    items: [
      "Computer & Network Hardware",
      "Microsoft Office",
      "Video Production",
      "Technical Documentation",
    ],
  },
];
