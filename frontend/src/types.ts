export type Service = {
  title: string;
  short: string;
  icon: string;
  image: string;
};

export type Project = {
  title: string;
  location: string;
  description: string;
  image: string;
};

export type Testimonial = {
  name: string;
  company: string;
  review: string;
  image: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type SiteContent = {
  companyName: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  heroImage: string;

  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  stats: Stat[];

  footerNote: string;
};

export type View = "home" | "admin";

export const STORAGE_KEY = "amalo_site_content";
export const SESSION_KEY = "amalo_admin_session";

export const ADMIN_EMAIL = "admin@amalo.com";
export const ADMIN_PASSWORD = "admin123";

export const defaultContent: SiteContent = {
  companyName: "AMALO",

  eyebrow: "Engineering Group",

  tagline: "The future of engineering, delivered today.",

  intro:
    "We design, build, and maintain the essential systems that keep people moving, connected, and safe.",

  phone: "+263 077 840 1416",

  email: "info@amalo.co.org",

  website: "www.amalo.com",

  location: "Masaka, Uganda",

  heroImage:
    "https://images.pexels.com/photos/8482865/pexels-photo-8482865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",

  services: [
    {
      title: "Electrical Installations & Infrastructure",
      short: "Power systems engineered for performance and built to last.",
      icon: "Zap",
      image: "/images/services/electrical.jpg",
    },
    {
      title: "HVAC & Building Services",
      short:
        "Comfortable, efficient environments from concept to commissioning.",
      icon: "Wind",
      image: "/images/services/mechanical.jpg",
    },
    {
      title: "Generator & Power Transfer Systems",
      short:
        "Resilient power when your operation cannot afford downtime.",
      icon: "BatteryCharging",
      image: "/images/services/renewable.jpg",
    },
    {
      title: "Protection & Earthing Systems",
      short:
        "Practical safety systems that protect people and assets.",
      icon: "ShieldCheck",
      image: "/images/services/security.jpg",
    },
    {
      title: "ICT & Communication Systems",
      short:
        "Connected infrastructure ready for the way teams work today.",
      icon: "RadioTower",
      image: "/images/services/ict.jpg",
    },
    {
      title: "Testing, Maintenance & Commissioning",
      short:
        "Confidence after handover, with responsive ongoing support.",
      icon: "ClipboardCheck",
      image: "/images/services/maintenance.jpg",
    },
  ],

  projects: [
    {
      title: "Electrical Installation",
      location: "Kampala, Uganda",
      description:
        "Complete electrical installation for a commercial office complex.",
      image: "/images/projects/project1.jpg",
    },
    {
      title: "Solar Energy System",
      location: "Mukono, Uganda",
      description:
        "Design and installation of a high-capacity solar power system.",
      image: "/images/projects/project2.jpg",
    },
    {
      title: "ICT Infrastructure",
      location: "Entebbe, Uganda",
      description:
        "Structured cabling, networking and communication infrastructure.",
      image: "/images/projects/project3.jpg",
    },
    {
      title: "Industrial Automation",
      location: "Jinja, Uganda",
      description:
        "Automation systems for improved production efficiency.",
      image: "/images/projects/project4.jpg",
    },
  ],

  testimonials: [
    {
      name: "John Okello",
      company: "ABC Construction",
      review:
        "AMALO Engineering exceeded our expectations. Their professionalism and attention to detail were exceptional.",
      image: "/images/testimonials/client1.jpg",
    },
    {
      name: "Sarah Namusoke",
      company: "Green Energy Ltd",
      review:
        "From planning to commissioning, every stage was handled professionally. Highly recommended.",
      image: "/images/testimonials/client2.jpg",
    },
    {
      name: "David Ouma",
      company: "Prime Developers",
      review:
        "Their team delivered our project on time while maintaining outstanding quality standards.",
      image: "/images/testimonials/client3.jpg",
    },
  ],

  stats: [
    {
      value: "01",
      label: "Trusted Engineering Partner",
    },
    {
      value: "360°",
      label: "From Design to Delivery",
    },
    {
      value: "24/7",
      label: "Systems That Keep Working",
    },
  ],

  footerNote: "Engineering with purpose. Delivery with discipline.",
};

export function loadContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return {
        ...defaultContent,
        ...JSON.parse(stored),
      } as SiteContent;
    }
  } catch {
    // Ignore malformed storage
  }

  return defaultContent;
}