import { ArrowUpRight } from "lucide-react";
import "./ServiceCard.css";

type Service = {
  service_id: number;
  title: string;
  short_description: string;
  icon: string;
  image: string;
};

type Props = {
  service: Service;
  index: number;
};

export function ServiceCard({
  service,
  index,
}: Props) {
  return (
    <article className="amaloo-service-card">
       <div className="amaloo-service-image">
         <img
           src={service.image}
           alt={service.title}
         />
        <div className="amaloo-service-overlay" />

        <span className="amaloo-service-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="amaloo-service-content">
        <h3>{service.title}</h3>

        <p>{service.short_description}</p>
      </div>
    </article>
  );
}