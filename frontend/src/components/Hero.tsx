import { ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/api/api";

type SiteSettings = {
  setting_id: number;
  company_name: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  hero_image: string;
  footer_note: string;
};

export function Hero() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data: SiteSettings = await api.getSettings();

        setSettings(data);
      } catch (error) {
        console.error(
          "Failed to fetch hero settings:",
          error
        );
      }
    };

    fetchSettings();
  }, []);

  if (!settings) {
    return (
      <section className="hero-section">
        <div className="hero-copy">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <div className="kicker">
          <span className="kicker-line" />
          {settings.eyebrow}
        </div>

        <h1>{settings.tagline}</h1>

        <p>{settings.intro}</p>

        <div className="hero-actions">
          <a
            href="#contact"
            className="button button-dark"
          >
            Start a conversation
            <ArrowUpRight size={18} />
          </a>

          <a
            href="#work"
            className="text-link"
          >
            Explore capabilities
            <ChevronRight size={17} />
          </a>
        </div>

        <div className="hero-note">
          <Sparkles size={15} />
          Built for the demands of tomorrow.
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-frame">
          <img
            src={settings.hero_image}
            alt="Engineers reviewing a construction plan"
          />

          <div className="image-wash" />
        </div>

        <div className="visual-stamp">
          <span>AMALO</span>
          <small>Engineering Group</small>
        </div>

        <div className="visual-index">
          01 <span>/ 06</span>
        </div>
      </div>
    </section>
  );
}