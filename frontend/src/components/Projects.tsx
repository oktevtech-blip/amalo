import "./Projects.css";
import { useEffect, useState } from "react";
import { api } from "@/api/api";

type Project = {
  project_id: number;
  title: string;
  location: string;
  description: string;
  image: string;
};

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data: Project[] = await api.getProjects();

        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="amaloo-projects-section" id="projects">
      <div className="amaloo-projects-header">
        <span>OUR PROJECTS</span>

        <h2>
          Engineering excellence
          <br />
          delivered across Uganda.
        </h2>

        <p>
          Every project reflects our commitment to quality, innovation,
          reliability and customer satisfaction.
        </p>
      </div>

      {loading && (
        <div className="amaloo-projects-loading">
          <p>Loading projects...</p>
        </div>
      )}

      {!loading && error && (
        <div className="amaloo-projects-error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="amaloo-projects-empty">
          <p>No projects available.</p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="amaloo-projects-grid">
          {projects.map((project) => (
            <article
              className="amaloo-project-card"
              key={project.project_id}
            >
              <img
                src={project.image}
                alt={project.title}
              />

              <div className="amaloo-project-overlay">
                <span>{project.location}</span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

