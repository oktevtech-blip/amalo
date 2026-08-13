import { FormEvent, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  defaultContent,
  SESSION_KEY,
  STORAGE_KEY,
  type SiteContent,
} from '@/types';

import { AdminAuth } from '../admin/AdminAuth';
import { AdminHeader, AdminTitle } from '../admin/AdminHeader';
import { HeroEditor } from '../admin/HeroEditor';
import { ContactEditor } from '../admin/ContactEditor';
import { ServicesEditor } from '../admin/ServicesEditor';
import { ProjectsEditor } from '../admin/ProjectsEditor';
import { TestimonialsEditor } from '../admin/TestimonialsEditor';
import { StatsEditor } from '../admin/StatsEditor';

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  signedIn: boolean;
  setSignedIn: (value: boolean) => void;
  onBack: () => void;
};

export function AdminPage({
  content,
  setContent,
  signedIn,
  setSignedIn,
  onBack,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState(content);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const signOut = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSignedIn(false);
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setContent(draft);
      setMessage('Changes published to the website.');
    } catch {
      setMessage('Could not save changes locally.');
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    if (
      window.confirm(
        'Reset all content back to the original defaults? This cannot be undone.'
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      setContent(defaultContent);
      setDraft(defaultContent);
      setMessage('Reverted to default content.');
    }
  };

  if (!signedIn) {
    return (
      <AdminAuth
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="admin-shell">
      <AdminHeader onBack={onBack} onSignOut={signOut} />

      <main className="admin-main">
        <AdminTitle />

        <form className="editor-form" onSubmit={save}>
          <div className="editor-column">
            <HeroEditor draft={draft} setDraft={setDraft} />
            <ContactEditor draft={draft} setDraft={setDraft} />
            <ProjectsEditor />
          </div>

          <div className="editor-column">
            <ServicesEditor draft={draft} setDraft={setDraft} />
            <TestimonialsEditor draft={draft} setDraft={setDraft} />
            <StatsEditor draft={draft} setDraft={setDraft} />
          </div>

          <div className="editor-submit">
            <span>
              {message ||
                'Your changes are saved privately until you publish.'}
            </span>

            <div className="editor-submit-actions">
              <button
                type="button"
                className="reset-button"
                onClick={resetToDefaults}
              >
                Reset to defaults
              </button>

              <button
                className="button button-dark"
                type="submit"
                disabled={saving}
              >
                {saving ? 'Publishing…' : 'Publish changes'}
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}