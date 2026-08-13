// import type { SiteContent } from "@/types";

// type Props = {
//   draft: SiteContent;
//   setDraft: (next: SiteContent) => void;
// };

// export function ProjectsEditor({ draft, setDraft }: Props) {
//   return (
//     <section className="editor-card">
//       <div className="editor-card-heading">
//         <span>04</span>

//         <div>
//           <h2>Projects</h2>
//           <p>Showcase the engineering projects completed by your team.</p>
//         </div>
//       </div>

//       {draft.projects.map((project, index) => (
//         <div className="service-editor" key={`${project.title}-${index}`}>
//           <div className="service-number">
//             0{index + 1}
//           </div>

//           <div>
//             <input
//               placeholder="Project title"
//               value={project.title}
//               onChange={(event) => {
//                 const projects = [...draft.projects];

//                 projects[index] = {
//                   ...projects[index],
//                   title: event.target.value,
//                 };

//                 setDraft({
//                   ...draft,
//                   projects,
//                 });
//               }}
//             />

//             <input
//               placeholder="Location"
//               value={project.location}
//               onChange={(event) => {
//                 const projects = [...draft.projects];

//                 projects[index] = {
//                   ...projects[index],
//                   location: event.target.value,
//                 };

//                 setDraft({
//                   ...draft,
//                   projects,
//                 });
//               }}
//             />

//             <textarea
//               rows={3}
//               placeholder="Description"
//               value={project.description}
//               onChange={(event) => {
//                 const projects = [...draft.projects];

//                 projects[index] = {
//                   ...projects[index],
//                   description: event.target.value,
//                 };

//                 setDraft({
//                   ...draft,
//                   projects,
//                 });
//               }}
//             />

//             {project.image && (
//               <div style={{ margin: "10px 0" }}>
//                 <img
//                   src={project.image}
//                   alt={project.title}
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
//                 const file = event.target.files?.[0];

//                 if (!file) return;

//                 const reader = new FileReader();

//                 reader.onload = () => {
//                   const projects = [...draft.projects];

//                   projects[index] = {
//                     ...projects[index],
//                     image: reader.result as string,
//                   };

//                   setDraft({
//                     ...draft,
//                     projects,
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

type Project = {
  project_id: number;
  title: string;
  location: string;
  description: string;
  image: string;
};

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data: Project[] = await api.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const updateProject = (
    index: number,
    field: "title" | "location" | "description",
    value: string
  ) => {
    setProjects((currentProjects) => {
      const updatedProjects = [...currentProjects];

      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };

      return updatedProjects;
    });
  };

  const saveProject = async (project: Project) => {
    try {
      await api.updateProject(project.project_id, {
        title: project.title,
        location: project.location,
        description: project.description,
        image: project.image,
      });

      alert("Project updated successfully.");
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project.");
    }
  };

  const uploadProjectImage = async (
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
        throw new Error("No image URL returned from upload.");
      }

      const project = projects[index];

      await api.updateProject(project.project_id, {
        title: project.title,
        location: project.location,
        description: project.description,
        image: imageUrl,
      });

      setProjects((currentProjects) => {
        const updatedProjects = [...currentProjects];

        updatedProjects[index] = {
          ...updatedProjects[index],
          image: imageUrl,
        };

        return updatedProjects;
      });
    } catch (error) {
      console.error("Failed to upload project image:", error);
      alert("Failed to upload project image.");
    }
  };

  return (
     <section className="editor-card">
       <div className="editor-card-heading">
        <span>04</span>

        <div>
          <h2>Projects</h2>

          <p>
            Showcase the engineering projects completed by your team.
          </p>
        </div>
      </div>

      {projects.map((project, index) => (
        <div
          className="service-editor"
          key={project.project_id}
        >
          <div className="service-number">
            0{index + 1}
          </div>

          <div>
            <input
              placeholder="Project title"
              value={project.title}
              onChange={(event) => {
                updateProject(
                  index,
                  "title",
                  event.target.value
                );
              }}
            />

            <input
              placeholder="Location"
              value={project.location}
              onChange={(event) => {
                updateProject(
                  index,
                  "location",
                  event.target.value
                );
              }}
            />

            <textarea
              rows={3}
              placeholder="Description"
              value={project.description}
              onChange={(event) => {
                updateProject(
                  index,
                  "description",
                  event.target.value
                );
              }}
            />

            {project.image && (
              <div style={{ margin: "10px 0" }}>
                <img
                  src={project.image}
                  alt={project.title}
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
                const file = event.target.files?.[0];

                if (!file) return;

                uploadProjectImage(index, file);

                event.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => saveProject(project)}
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}