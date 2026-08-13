// import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
// import type { SiteContent } from '@/types';

// export function Contact({ content }: { content: SiteContent }) {
//   return (
//     <section className="contact-section" id="contact">
//       <div className="contact-intro">
//         <div className="section-label">04 — Let's talk</div>
//         <h2>Have a complex<br /><em>problem?</em></h2>
//         <p>Tell us where you're headed. We'll help you map the way there.</p>
//       </div>
//       <div className="contact-details">
//         <a href={`mailto:${content.email}`} className="contact-row">
//           <span><Mail size={18} /> Email</span><strong>{content.email}</strong><ArrowUpRight size={17} />
//         </a>
//         <a href={`tel:${content.phone.replaceAll(' ', '')}`} className="contact-row">
//           <span><Phone size={18} /> Call us</span><strong>{content.phone}</strong><ArrowUpRight size={17} />
//         </a>
//         <div className="contact-row">
//           <span><MapPin size={18} /> Based in</span><strong>{content.location}</strong>
//         </div>
//       </div>
//     </section>
//   );
// }

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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

export function Contact() {
  const [settings, setSettings] =
    useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data: SiteSettings =
          await api.getSettings();

        setSettings(data);
      } catch (error) {
        console.error(
          "Failed to fetch contact settings:",
          error
        );
      }
    };

    fetchSettings();
  }, []);

  if (!settings) {
    return null;
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-intro" >
        <div className="section-label">
          04 — Let's talk
        </div>

        <h2>
          Have a complex
          <br />
          <em>problem?</em>
        </h2>

        <p>
          Tell us where you're headed. We'll help you map
          the way there.
        </p>
      </div>

      <div className="contact-details">
        <a
          href={`mailto:${settings.email}`}
          className="contact-row"
        >
          <Mail size={20} />

          <div>
            <span>Email</span>
            <strong>{settings.email}</strong>
          </div>

          <ArrowUpRight size={18} />
        </a>

        <a
          href={`tel:${settings.phone.replaceAll(" ", "")}`}
          className="contact-row"
        >
          <Phone size={20} />

          <div>
            <span>Call us</span>
            <strong>{settings.phone}</strong>
          </div>

          <ArrowUpRight size={18} />
        </a>

        <div className="contact-row">
          <MapPin size={20} />

          <div>
            <span>Based in</span>
            <strong>{settings.location}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
