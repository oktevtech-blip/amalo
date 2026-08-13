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

export function HeroEditor() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();

      setSettings(data);
    } catch (error) {
      console.error(
        "Failed to fetch site settings:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: keyof SiteSettings,
    value: string
  ) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);

      await api.updateSettings({
        company_name: settings.company_name,
        eyebrow: settings.eyebrow,
        tagline: settings.tagline,
        intro: settings.intro,
        phone: settings.phone,
        email: settings.email,
        website: settings.website,
        location: settings.location,
        hero_image: settings.hero_image,
        footer_note: settings.footer_note,
      });

      await loadSettings();

      alert("Hero section saved successfully.");
    } catch (error) {
      console.error(
        "Failed to save hero section:",
        error
      );

      alert("Failed to save hero section.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="editor-card">
        <div className="editor-card-heading">
          <span>01</span>

          <div>
            <h2>Hero section</h2>
            <p>The first impression visitors get.</p>
          </div>
        </div>

        <p>Loading hero settings...</p>
      </section>
    );
  }

  if (!settings) {
    return (
      <section className="editor-card">
        <div className="editor-card-heading">
          <span>01</span>

          <div>
            <h2>Hero section</h2>
            <p>The first impression visitors get.</p>
          </div>
        </div>

        <p>
          Unable to load hero settings.
        </p>
      </section>
    );
  }

  return (
    <section className="editor-card">
      <div className="editor-card-heading">
        <span>01</span>

        <div>
          <h2>Hero section</h2>
          <p>The first impression visitors get.</p>
        </div>
      </div>

      <label>
        Small heading
        <input
          value={settings.eyebrow}
          onChange={(event) =>
            handleChange(
              "eyebrow",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Main statement
        <textarea
          rows={3}
          value={settings.tagline}
          onChange={(event) =>
            handleChange(
              "tagline",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Supporting copy
        <textarea
          rows={3}
          value={settings.intro}
          onChange={(event) =>
            handleChange(
              "intro",
              event.target.value
            )
          }
        />
      </label>

      <label>
        Hero image URL
        <input
          value={settings.hero_image}
          onChange={(event) =>
            handleChange(
              "hero_image",
              event.target.value
            )
          }
        />
      </label>

      {settings.hero_image && (
        <div style={{ margin: "10px 0" }}>
          <img
            src={settings.hero_image}
            alt="Hero preview"
            style={{
              width: "220px",
              borderRadius: "4px",
            }}
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </section>
  );
}