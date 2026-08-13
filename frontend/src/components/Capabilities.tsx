import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { api } from "@/api/api";

type Service = {
  service_id: number;
  title: string;
  short_description: string;
  icon: string;
  image: string;
};

export function Capabilities() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data: Service[] = await api.getServices();

        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  const serviceCount = services.length;

  return (
    <section
      className="capabilities-section"
      id="work"
    >
      <div className="section-heading">
        <div>
          <div className="section-label">
            02 — What we do
          </div>

          <h2>
            Systems that move
            <br />
            <em>the world forward.</em>
          </h2>
        </div>

        <p>
          One partner across the full life of your project.
          From first sketch to final test, we make
          infrastructure dependable.
        </p>
      </div>

      <div className="services-grid">
        {services.slice(0, 6).map((service, index) => (
          <ServiceCard
            key={service.service_id}
            service={service}
            index={index}
          />
        ))}
      </div>

      <div className="capability-foot">
        <span>
          0{serviceCount} capabilities
        </span>

        <span className="foot-line" />

        <a href="#contact">
          Discuss your project
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}