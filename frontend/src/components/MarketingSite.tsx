import type { SiteContent } from '@/types';
import { Capabilities } from './Capabilities';
import { Contact } from './Contact';
import { Hero } from './Hero';
import { Numbers } from './Numbers';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { Statement } from './Statement';
import { TrustStrip } from './TrustStrip';
import { Projects } from './Projects';
import { Testimonials } from './Testimonials';

type Props = {
  content: SiteContent;
  onAdmin: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

export function MarketingSite({ content, onAdmin, mobileOpen, setMobileOpen }: Props) {
  return (
    <div className="site-shell">
      <SiteHeader content={content} onAdmin={onAdmin} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main id="top">
        <Hero content={content} />
        <TrustStrip />
        <Statement />
        <Capabilities />
        <Projects />
        <Numbers content={content} />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter content={content} onAdmin={onAdmin} />
    </div>
  );
}
