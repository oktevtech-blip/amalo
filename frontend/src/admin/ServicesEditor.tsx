// // import type { SiteContent } from '@/types';

// // type Props = {
// //   draft: SiteContent;
// //   setDraft: (next: SiteContent) => void;
// // };

// // export function ServicesEditor({ draft, setDraft }: Props) {
// //   return (
// //     <section className="editor-card">
// //       <div className="editor-card-heading"><span>03</span><div><h2>Services</h2><p>What your team is built to deliver.</p></div></div>
// //       {draft.services.map((service, index) => (
// //         <div className="service-editor" key={`${service.title}-${index}`}>
// //           <div className="service-number">0{index + 1}</div>
// //           <div>
// //             <input value={service.title} onChange={(event) => {
// //               const services = [...draft.services];
// //               services[index] = { ...services[index], title: event.target.value };
// //               setDraft({ ...draft, services });
// //             }} />
// //             <input value={service.short} onChange={(event) => {
// //               const services = [...draft.services];
// //               services[index] = { ...services[index], short: event.target.value };
// //               setDraft({ ...draft, services });
// //             }} />
// //             {service.image && (
// //   <div style={{ marginBottom: "10px" }}>
// //     <img
// //       src={service.image}
// //       alt={service.title}
// //       style={{
// //         width: "180px",
// //         height: "120px",
// //         objectFit: "cover",
// //       }}
// //     />
// //   </div>
// // )}

// // <input
// //   type="file"
// //   accept="image/*"
// //   onChange={(event) => {
// //     const file = event.target.files?.[0];

// //     if (!file) return;

// //     const reader = new FileReader();

// //     reader.onload = () => {
// //       const services = [...draft.services];

// //       services[index] = {
// //         ...services[index],
// //         image: reader.result as string,
// //       };

// //       setDraft({
// //         ...draft,
// //         services,
// //       });
// //     };

// //     reader.readAsDataURL(file);
// //   }}
// // />            
// //           </div>
// //         </div>
// //       ))}
// //     </section>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { api } from "@/api/api";

// type Service = {
//   service_id: number;
//   title: string;
//   short_description: string;
//   icon: string;
//   image: string;
// };

// export function ServicesEditor() {
//   const [services, setServices] = useState<Service[]>([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const data: Service[] = await api.getServices();

//         setServices(data);
//       } catch (error) {
//         console.error(
//           "Failed to fetch services:",
//           error
//         );
//       }
//     };

//     fetchServices();
//   }, []);

//   const updateServiceField = (
//     index: number,
//     field: "title" | "short_description",
//     value: string
//   ) => {
//     setServices((currentServices) => {
//       const updatedServices = [...currentServices];

//       updatedServices[index] = {
//         ...updatedServices[index],
//         [field]: value,
//       };

//       return updatedServices;
//     });
//   };

//   const saveService = async (service: Service) => {
//     try {
//       await api.updateService(
//         service.service_id,
//         {
//           title: service.title,
//           short_description:
//             service.short_description,
//           icon: service.icon,
//           image: service.image,
//         }
//       );

//       alert("Service updated successfully.");
//     } catch (error) {
//       console.error(
//         "Failed to update service:",
//         error
//       );

//       alert("Failed to update service.");
//     }
//   };

//   const uploadServiceImage = async (
//     index: number,
//     file: File
//   ) => {
//     try {
//       const response = await api.uploadImage(file);

//       const imageUrl =
//         response.image ||
//         response.image_url ||
//         response.url;

//       if (!imageUrl) {
//         throw new Error(
//           "No image URL returned from upload."
//         );
//       }

//       const service = services[index];

//       await api.updateService(
//         service.service_id,
//         {
//           title: service.title,
//           short_description:
//             service.short_description,
//           icon: service.icon,
//           image: imageUrl,
//         }
//       );

//       setServices((currentServices) => {
//         const updatedServices = [...currentServices];

//         updatedServices[index] = {
//           ...updatedServices[index],
//           image: imageUrl,
//         };

//         return updatedServices;
//       });

//       alert("Service image updated successfully.");
//     } catch (error) {
//       console.error(
//         "Failed to upload service image:",
//         error
//       );

//       alert("Failed to upload service image.");
//     }
//   };

//   return (
//     <section>
//       <div>
//         <span>03</span>

//         <div>
//           <h2>Services</h2>

//           <p>
//             What your team is built to deliver.
//           </p>
//         </div>
//       </div>

//       {services.map((service, index) => (
//         <div
//           className="service-editor"
//           key={service.service_id}
//         >
//           <div className="service-number">
//             0{index + 1}
//           </div>

//           <div>
//             <input
//               placeholder="Service title"
//               value={service.title}
//               onChange={(event) => {
//                 updateServiceField(
//                   index,
//                   "title",
//                   event.target.value
//                 );
//               }}
//             />

//             <input
//               placeholder="Short description"
//               value={service.short_description}
//               onChange={(event) => {
//                 updateServiceField(
//                   index,
//                   "short_description",
//                   event.target.value
//                 );
//               }}
//             />

//             {service.image && (
//               <div style={{ margin: "10px 0" }}>
//                 <img
//                   src={service.image}
//                   alt={service.title}
//                   style={{
//                     width: "180px",
//                     borderRadius: "4px",
//                   }}
//                 />
//               </div>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(event) => {
//                 const file =
//                   event.target.files?.[0];

//                 if (!file) return;

//                 uploadServiceImage(
//                   index,
//                   file
//                 );

//                 event.target.value = "";
//               }}
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 saveService(service)
//               }
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "@/api/api";

type Service = {
  service_id: number;
  title: string;
  short_description: string;
  icon: string;
  image: string;
};

export function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data: Service[] = await api.getServices();

        setServices(data);
      } catch (error) {
        console.error(
          "Failed to fetch services:",
          error
        );
      }
    };

    fetchServices();
  }, []);

  const updateServiceField = (
    index: number,
    field: "title" | "short_description",
    value: string
  ) => {
    setServices((currentServices) => {
      const updatedServices = [...currentServices];

      updatedServices[index] = {
        ...updatedServices[index],
        [field]: value,
      };

      return updatedServices;
    });
  };

  const saveService = async (service: Service) => {
    try {
      await api.updateService(
        service.service_id,
        {
          title: service.title,
          short_description:
            service.short_description,
          icon: service.icon,
          image: service.image,
        }
      );

      alert("Service updated successfully.");
    } catch (error) {
      console.error(
        "Failed to update service:",
        error
      );

      alert("Failed to update service.");
    }
  };

  const uploadServiceImage = async (
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

      const service = services[index];

      await api.updateService(
        service.service_id,
        {
          title: service.title,
          short_description:
            service.short_description,
          icon: service.icon,
          image: imageUrl,
        }
      );

      setServices((currentServices) => {
        const updatedServices = [...currentServices];

        updatedServices[index] = {
          ...updatedServices[index],
          image: imageUrl,
        };

        return updatedServices;
      });

      alert("Service image updated successfully.");
    } catch (error) {
      console.error(
        "Failed to upload service image:",
        error
      );

      alert("Failed to upload service image.");
    }
  };

  return (
    <section className="editor-card">
      <div className="editor-card-heading">
        <span>03</span>

        <div>
          <h2>Services</h2>

          <p>
            What your team is built to deliver.
          </p>
        </div>
      </div>

      {services.map((service, index) => (
        <div
          className="service-editor"
          key={service.service_id}
        >
          <div className="service-number">
            0{index + 1}
          </div>

          <div>
            <input
              placeholder="Service title"
              value={service.title}
              onChange={(event) => {
                updateServiceField(
                  index,
                  "title",
                  event.target.value
                );
              }}
            />

            <input
              placeholder="Short description"
              value={service.short_description}
              onChange={(event) => {
                updateServiceField(
                  index,
                  "short_description",
                  event.target.value
                );
              }}
            />

            {service.image && (
              <div style={{ margin: "10px 0" }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: "180px",
                    borderRadius: "4px",
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

                uploadServiceImage(
                  index,
                  file
                );

                event.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() =>
                saveService(service)
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