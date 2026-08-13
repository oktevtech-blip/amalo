// import type { SiteContent } from "@/types";

// type Props = {
//   draft: SiteContent;
//   setDraft: (next: SiteContent) => void;
// };

// export function TestimonialsEditor({ draft, setDraft }: Props) {
//   return (
//     <section className="editor-card">
//       <div className="editor-card-heading">
//         <span>06</span>

//         <div>
//           <h2>Testimonials</h2>
//           <p>Manage what your clients say about your company.</p>
//         </div>
//       </div>

//       {draft.testimonials.map((testimonial, index) => (
//         <div
//           className="service-editor"
//           key={`${testimonial.name}-${index}`}
//         >
//           <div className="service-number">
//             0{index + 1}
//           </div>

//           <div>
//             <input
//               placeholder="Client Name"
//               value={testimonial.name}
//               onChange={(event) => {
//                 const testimonials = [...draft.testimonials];

//                 testimonials[index] = {
//                   ...testimonials[index],
//                   name: event.target.value,
//                 };

//                 setDraft({
//                   ...draft,
//                   testimonials,
//                 });
//               }}
//             />

//             <input
//               placeholder="Company"
//               value={testimonial.company}
//               onChange={(event) => {
//                 const testimonials = [...draft.testimonials];

//                 testimonials[index] = {
//                   ...testimonials[index],
//                   company: event.target.value,
//                 };

//                 setDraft({
//                   ...draft,
//                   testimonials,
//                 });
//               }}
//             />

//             <textarea
//               rows={4}
//               placeholder="Client Review"
//               value={testimonial.review}
//               onChange={(event) => {
//                 const testimonials = [...draft.testimonials];

//                 testimonials[index] = {
//                   ...testimonials[index],
//                   review: event.target.value,
//                 };

//                 setDraft({
//                   ...draft,
//                   testimonials,
//                 });
//               }}
//             />

//             {testimonial.image && (
//               <div style={{ margin: "10px 0" }}>
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   style={{
//                     width: "80px",
//                     height: "80px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                   }}
//                 />
//               </div>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(event) => {
//                 const file = event.target.files?.[0];

//                 if (!file) return;

//                 const reader = new FileReader();

//                 reader.onload = () => {
//                   const testimonials = [...draft.testimonials];

//                   testimonials[index] = {
//                     ...testimonials[index],
//                     image: reader.result as string,
//                   };

//                   setDraft({
//                     ...draft,
//                     testimonials,
//                   });
//                 };

//                 reader.readAsDataURL(file);
//               }}
//             />
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "@/api/api";

type Testimonial = {
  testimonial_id: number;
  client_name: string;
  company: string;
  review: string;
  image: string;
};

export function TestimonialsEditor() {
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

  const updateTestimonialField = (
    index: number,
    field: "client_name" | "company" | "review",
    value: string
  ) => {
    setTestimonials((currentTestimonials) => {
      const updatedTestimonials = [...currentTestimonials];

      updatedTestimonials[index] = {
        ...updatedTestimonials[index],
        [field]: value,
      };

      return updatedTestimonials;
    });
  };

  const saveTestimonial = async (
    testimonial: Testimonial
  ) => {
    try {
      await api.updateTestimonial(
        testimonial.testimonial_id,
        {
          client_name: testimonial.client_name,
          company: testimonial.company,
          review: testimonial.review,
          image: testimonial.image,
        }
      );

      alert("Testimonial updated successfully.");
    } catch (error) {
      console.error(
        "Failed to update testimonial:",
        error
      );

      alert("Failed to update testimonial.");
    }
  };

  const uploadTestimonialImage = async (
    index: number,
    file: File
  ) => {
    try {
      const response = await api.uploadImage(file);

      const imageUrl =
        response.image ||
        response.image_url ||
        response.url;

      if (!imageUrl) {
        throw new Error(
          "No image URL returned from upload."
        );
      }

      const testimonial = testimonials[index];

      await api.updateTestimonial(
        testimonial.testimonial_id,
        {
          client_name: testimonial.client_name,
          company: testimonial.company,
          review: testimonial.review,
          image: imageUrl,
        }
      );

      setTestimonials((currentTestimonials) => {
        const updatedTestimonials = [
          ...currentTestimonials,
        ];

        updatedTestimonials[index] = {
          ...updatedTestimonials[index],
          image: imageUrl,
        };

        return updatedTestimonials;
      });
    } catch (error) {
      console.error(
        "Failed to upload testimonial image:",
        error
      );

      alert("Failed to upload testimonial image.");
    }
  };

  return (
    <section className="editor-card">
      <div  className="editor-card-heading">
        <span>06</span>

        <div>
          <h2>Testimonials</h2>

          <p>
            Manage what your clients say about your company.
          </p>
        </div>
      </div>

      {testimonials.map((testimonial, index) => (
        <div
          className="service-editor"
          key={testimonial.testimonial_id}
        >
          <div className="service-number">
            0{index + 1}
          </div>

          <div>
            <input
              placeholder="Client Name"
              value={testimonial.client_name}
              onChange={(event) => {
                updateTestimonialField(
                  index,
                  "client_name",
                  event.target.value
                );
              }}
            />

            <input
              placeholder="Company"
              value={testimonial.company}
              onChange={(event) => {
                updateTestimonialField(
                  index,
                  "company",
                  event.target.value
                );
              }}
            />

            <textarea
              rows={4}
              placeholder="Client Review"
              value={testimonial.review}
              onChange={(event) => {
                updateTestimonialField(
                  index,
                  "review",
                  event.target.value
                );
              }}
            />

            {testimonial.image && (
              <div style={{ margin: "10px 0" }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.client_name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                if (!file) return;

                uploadTestimonialImage(
                  index,
                  file
                );

                event.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() =>
                saveTestimonial(testimonial)
              }
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}