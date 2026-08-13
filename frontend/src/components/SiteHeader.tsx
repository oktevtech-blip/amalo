import { Menu, MonitorCog, X } from "lucide-react";
import type { SiteContent } from "@/types";

type Props = {
  content: SiteContent;
  onAdmin: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

export function SiteHeader({
  content,
  onAdmin,
  mobileOpen,
  setMobileOpen,
}: Props) {
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="AMALO home">
        <span className="brand-mark">A</span>
        <span>
          <strong>{content.companyName}</strong>
          <small>{content.eyebrow}</small>
        </span>
      </a>

      <nav className={mobileOpen ? "main-nav is-open" : "main-nav"}>

        <a href="#approach" onClick={() => setMobileOpen(false)}>
          Our Approach
        </a>

        <a href="#work" onClick={() => setMobileOpen(false)}>Services</a>

        <a href="#projects" onClick={() => setMobileOpen(false)}>
          Projects
        </a>

        <a href="#testimonials" onClick={() => setMobileOpen(false)}>
          Testimonials
        </a>

        <a href="#contact" onClick={() => setMobileOpen(false)}>
          Contact
        </a>

        <button className="nav-cta" onClick={onAdmin}>
          <MonitorCog size={16} />
          <span>Admin</span>
        </button>
      </nav>

      <button
        className="menu-button"
        aria-label="Toggle navigation"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}