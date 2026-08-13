import { Globe, LockKeyhole } from 'lucide-react';
import type { SiteContent } from '@/types';

type Props = { content: SiteContent; onAdmin: () => void };

export function SiteFooter({ content, onAdmin }: Props) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">A</span>
        <span><strong>{content.companyName}</strong><small>{content.footerNote}</small></span>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} {content.companyName}</span>
        <span className="socials"><a href="#contact" aria-label="Website"><Globe size={17} /></a></span>
        <button onClick={onAdmin}><LockKeyhole size={14} /> Owner access</button>
      </div>
    </footer>
  );
}
