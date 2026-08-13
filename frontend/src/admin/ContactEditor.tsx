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

export function ContactEditor() {
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
          "Failed to fetch site settings:",
          error
        );
      }
    };

    fetchSettings();
  }, []);

  const updateField = (
    field: keyof SiteSettings,
    value: string
  ) => {
    setSettings((currentSettings) => {
      if (!currentSettings) return currentSettings;

      return {
        ...currentSettings,
        [field]: value,
      };
    });
  };

  const saveSettings = async () => {
    if (!settings) return;

    try {
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

      alert("Contact details updated successfully.");
    } catch (error) {
      console.error(
        "Failed to update contact details:",
        error
      );

      alert("Failed to update contact details.");
    }
  };

  if (!settings) {
    return (
      <section className="editor-card">
        <div className="editor-card-heading">
          <span>02</span>

          <div>
            <h2>Contact details</h2>
            <p>Make it easy to start a conversation.</p>
          </div>
        </div>

        <p>Loading contact details...</p>
      </section>
    );
  }

  return (
    <section className="editor-card">
      <div className="editor-card-heading">
        <span>02</span>

        <div>
          <h2>Contact details</h2>
          <p>Make it easy to start a conversation.</p>
        </div>
      </div>

      <div className="two-fields">
        <label>
          Phone

          <input
            value={settings.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
          />
        </label>

        <label>
          Email

          <input
            type="email"
            value={settings.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
          />
        </label>
      </div>

      <div className="two-fields">
        <label>
          Website

          <input
            value={settings.website}
            onChange={(event) =>
              updateField(
                "website",
                event.target.value
              )
            }
          />
        </label>

        <label>
          Location

          <input
            value={settings.location}
            onChange={(event) =>
              updateField(
                "location",
                event.target.value
              )
            }
          />
        </label>
      </div>

      <button
        type="button"
        onClick={saveSettings}
      >
        Save Changes
      </button>
    </section>
  );
}