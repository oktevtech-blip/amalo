import { FormEvent, useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_KEY } from '@/types';

type Props = {
  signedIn: boolean;
  setSignedIn: (value: boolean) => void;
  onBack: () => void;
};

export function AdminAuth({ signedIn, setSignedIn, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setSignedIn(true);
      setMessage('Welcome back.');
    } else {
      setMessage('Incorrect email or password.');
    }
  };

  return (
    <div className="admin-shell auth-shell">
      <div className="admin-brand"><span className="brand-mark">A</span><div><strong>AMALO</strong><small>Owner studio</small></div></div>
      <button className="back-button" onClick={onBack}><ChevronRight size={16} /> View website</button>
      <div className="auth-card">
        <div className="section-label">Private access</div>
        <h1>Welcome back.</h1>
        <p>Sign in to update the story, services, and contact details on your website.</p>
        <form onSubmit={submit} className="auth-form">
          <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="you@company.com" /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="Password" /></label>
          <button className="button button-dark" type="submit">Sign in <ArrowUpRight size={17} /></button>
        </form>
        {message && <div className="form-message">{message}</div>}
        <div className="auth-hint">Default credentials<br /><strong>{ADMIN_EMAIL}</strong><br /><strong>{ADMIN_PASSWORD}</strong></div>
      </div>
    </div>
  );
}
