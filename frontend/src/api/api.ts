// const API_URL = "http://localhost:5000/api";
const API_URL = "https://amalo.onrender.com/api";

export const api = {
  // =========================
  // SETTINGS
  // =========================

  getSettings: async () => {
    const response = await fetch(`${API_URL}/settings`);

    if (!response.ok) {
      throw new Error("Failed to fetch site settings");
    }

    return response.json();
  },

  updateSettings: async (data: unknown) => {
    const response = await fetch(`${API_URL}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update site settings");
    }

    return response.json();
  },

  // =========================
  // SERVICES
  // =========================

  getServices: async () => {
    const response = await fetch(`${API_URL}/services`);

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    return response.json();
  },

  createService: async (data: unknown) => {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create service");
    }

    return response.json();
  },

  updateService: async (id: number, data: unknown) => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    return response.json();
  },

  deleteService: async (id: number) => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete service");
    }

    return response.json();
  },

  // =========================
  // PROJECTS
  // =========================

  getProjects: async () => {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return response.json();
  },

  createProject: async (data: unknown) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    return response.json();
  },

  updateProject: async (id: number, data: unknown) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    return response.json();
  },

  deleteProject: async (id: number) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return response.json();
  },

  // =========================
  // TESTIMONIALS
  // =========================

  getTestimonials: async () => {
    const response = await fetch(`${API_URL}/testimonials`);

    if (!response.ok) {
      throw new Error("Failed to fetch testimonials");
    }

    return response.json();
  },

  createTestimonial: async (data: unknown) => {
    const response = await fetch(`${API_URL}/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create testimonial");
    }

    return response.json();
  },

  updateTestimonial: async (id: number, data: unknown) => {
    const response = await fetch(`${API_URL}/testimonials/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update testimonial");
    }

    return response.json();
  },

  deleteTestimonial: async (id: number) => {
    const response = await fetch(`${API_URL}/testimonials/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete testimonial");
    }

    return response.json();
  },

  // =========================
  // STATS
  // =========================

  getStats: async () => {
    const response = await fetch(`${API_URL}/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }

    return response.json();
  },

  updateStat: async (id: number, data: unknown) => {
    const response = await fetch(`${API_URL}/stats/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update stat");
    }

    return response.json();
  },

  // =========================
  // IMAGE UPLOAD
  // =========================

  uploadImage: async (file: File) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    return response.json();
  },
};