// import "./Testimonials.css";
// import { Quote } from "lucide-react";
// import type { SiteContent } from "@/types";

// type Props = {
//   content: SiteContent;
// };

// export function Testimonials({ content }: Props) {
//   return (
//     <section className="amaloo-testimonials-section" id="testimonials">
//       <div className="amaloo-testimonials-header">
//         <span>CLIENT TESTIMONIALS</span>

//         <h2>
//           Trusted by clients
//           <br />
//           across Uganda.
//         </h2>
//       </div>

//       <div className="amaloo-testimonials-grid">
//         {content.testimonials.map((client) => (
//           <article
//             className="amaloo-testimonial-card"
//             key={client.name}
//           >
//             <Quote className="quote-icon" />

//             <p>{client.review}</p>

//             <div className="amaloo-client">
//               <img
//                 src={client.image}
//                 alt={client.name}
//               />

//               <div>
//                 <h4>{client.name}</h4>
//                 <span>{client.company}</span>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

import "./Testimonials.css";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/api/api";

type Testimonial = {
  testimonial_id: number;
  client_name: string;
  company: string;
  review: string;
  image: string;
};

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data: Testimonial[] = await api.getTestimonials();

        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section
      className="amaloo-testimonials-section"
      id="testimonials"
    >
      <div className="amaloo-testimonials-header">
        <span>CLIENT TESTIMONIALS</span>

        <h2>
          Trusted by clients
          <br />
          across Uganda.
        </h2>
      </div>

      <div className="amaloo-testimonials-grid">
        {testimonials.map((client) => (
          <article
            className="amaloo-testimonial-card"
            key={client.testimonial_id}
          >
            <Quote className="quote-icon" />

            <p>{client.review}</p>

            <div className="amaloo-client">
              <img
                src={client.image}
                alt={client.client_name}
              />

              <div>
                <h4>{client.client_name}</h4>
                <span>{client.company}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}