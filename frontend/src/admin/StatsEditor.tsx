// import type { SiteContent } from '@/types';

// type Props = {
//   draft: SiteContent;
//   setDraft: (next: SiteContent) => void;
// };

// export function StatsEditor({ draft, setDraft }: Props) {
//   return (
//     <section className="editor-card">
//       <div className="editor-card-heading"><span>04</span><div><h2>Proof points</h2><p>Short signals of confidence.</p></div></div>
//       {draft.stats.map((stat, index) => (
//         <div className="stat-editor" key={`${stat.label}-${index}`}>
//           <input value={stat.value} onChange={(event) => {
//             const stats = [...draft.stats];
//             stats[index] = { ...stats[index], value: event.target.value };
//             setDraft({ ...draft, stats });
//           }} />
//           <input value={stat.label} onChange={(event) => {
//             const stats = [...draft.stats];
//             stats[index] = { ...stats[index], label: event.target.value };
//             setDraft({ ...draft, stats });
//           }} />
//         </div>
//       ))}
//     </section>
//   );
// }


import { useEffect, useState } from "react";
import { api } from "@/api/api";

type Stat = {
  stat_id: number;
  value: string;
  label: string;
};

export function StatsEditor() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getStats();

      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    index: number,
    field: "value" | "label",
    value: string
  ) => {
    const updatedStats = [...stats];

    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    };

    setStats(updatedStats);
  };

  const handleSave = async (stat: Stat) => {
    try {
      setSaving(true);

      await api.updateStat(stat.stat_id, {
        value: stat.value,
        label: stat.label,
      });

      await loadStats();

      alert("Statistic saved successfully.");
    } catch (error) {
      console.error("Failed to save statistic:", error);

      alert("Failed to save statistic.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="editor-card">
        <div className="editor-card-heading">
          <span>04</span>

          <div>
            <h2>Proof points</h2>
            <p>Short signals of confidence.</p>
          </div>
        </div>

        <p>Loading statistics...</p>
      </section>
    );
  }

  return (
    <section className="editor-card">
      <div className="editor-card-heading">
        <span>04</span>

        <div>
          <h2>Proof points</h2>
          <p>Short signals of confidence.</p>
        </div>
      </div>

      {stats.map((stat, index) => (
        <div
          className="stat-editor"
          key={stat.stat_id}
        >
          <div className="stat-number">
            0{index + 1}
          </div>

          <div>
            <input
              placeholder="Value"
              value={stat.value}
              onChange={(event) =>
                handleChange(
                  index,
                  "value",
                  event.target.value
                )
              }
            />

            <input
              placeholder="Label"
              value={stat.label}
              onChange={(event) =>
                handleChange(
                  index,
                  "label",
                  event.target.value
                )
              }
            />

            <button
              type="button"
              onClick={() => handleSave(stat)}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}