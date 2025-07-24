export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  companyType: string;
  logo?: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  period: string;
  status: "active" | "completed";
  type: "work" | "education" | "project";
  impact: {
    highlight: string;
    description: string;
  };
  description: string;
  achievements: string[];
  technologies: Array<{
    name: string;
    category: string;
    level: "Expert" | "Advanced" | "Intermediate";
  }>;
  website?: string;
  github?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "hostelease",
    year: "Present",
    title: "Founder & Full Stack Developer",
    company: "HostelEase",
    companyType: "SaaS Startup",
    location: "Jharkhand, India",
    workType: "Remote",
    period: "2023 - Present",
    status: "active",
    type: "work",
    impact: {
      highlight: "Digitizing",
      description: "accommodation sector for 10M+ students across India",
    },
    description:
      "Founded HostelEase, a comprehensive SaaS-based hostel management platform revolutionizing the accommodation sector in India. Leading a cross-functional team of 5 developers to build scalable, user-centric solutions.",
    // ...other fields...
  },
  {
    id: "techies",
    year: "2024",
    title: "Full-stack Developer Intern",
    company: "Techies Gateway",
    companyType: "Digital Agency",
    location: "Hazaribag, Jharkhand, India",
    workType: "Hybrid",
    period: "2024",
    status: "active",
    type: "work",
    impact: {
      highlight: "Built 10+",
      description: "full-stack modules serving 1000+ users",
    },
    description:
      "Specialized in MERN stack development, building scalable and maintainable web applications. Focused on full-stack architecture, API development, and database optimization.",
    // ...other fields...
  },
  // ...other timeline events...
];
