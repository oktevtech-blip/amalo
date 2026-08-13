import { useEffect, useState } from "react";
import { api } from "@/api/api";

type Stat = {
  stat_id: number;
  value: string;
  label: string;
};

export function Numbers() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data: Stat[] = await api.getStats();

        setStats(data);
      } catch (error) {
        console.error(
          "Failed to fetch stats:",
          error
        );
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="numbers-section">
      <div className="section-label light">
        03 — By the numbers
      </div>

      <div className="numbers-grid">
        {stats.map((stat) => (
          <div
            className="number-card"
            key={stat.stat_id}
          >
            <strong>{stat.value}</strong>

            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}