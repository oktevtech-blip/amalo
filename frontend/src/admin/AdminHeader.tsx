import { ArrowUpRight, Check, CircleUserRound } from 'lucide-react';

type Props = { onBack: () => void; onSignOut: () => void };

export function AdminHeader({ onBack, onSignOut }: Props) {
  return (
    <header className="admin-header">
      <div className="admin-brand"><span className="brand-mark">A</span><div><strong>AMALO</strong><small>Owner studio</small></div></div>
      <div className="admin-header-actions">
        <span className="signed-in"><CircleUserRound size={16} /> Signed in</span>
        <button className="back-button" onClick={onBack}>View website <ArrowUpRight size={15} /></button>
        <button className="sign-out" onClick={onSignOut}>Sign out</button>
      </div>
    </header>
  );
}

export function AdminTitle() {
  return (
    <div className="admin-title">
      <div>
        <div className="section-label">Website editor</div>
        <h1>Shape the story.</h1>
        <p>Update the words and details your visitors see. Publish when you're ready.</p>
      </div>
      <div className="published-pill"><Check size={15} /> Live content</div>
    </div>
  );
}
