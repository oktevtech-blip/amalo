import db from "../config/db.js";

export const getProjects = async (req, res) => {
  try {
    const [projects] = await db.query(
      "SELECT * FROM projects ORDER BY project_id ASC"
    );

    res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const [projects] = await db.query(
      "SELECT * FROM projects WHERE project_id = ?",
      [id]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(projects[0]);
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      location,
      description,
      image,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Project title is required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO projects
      (title, location, description, image)
      VALUES (?, ?, ?, ?)`,
      [title, location, description, image]
    );

    res.status(201).json({
      message: "Project created successfully",
      project_id: result.insertId,
    });
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      location,
      description,
      image,
    } = req.body;

    const [result] = await db.query(
      `UPDATE projects
       SET
        title = ?,
        location = ?,
        description = ?,
        image = ?
       WHERE project_id = ?`,
      [
        title,
        location,
        description,
        image,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM projects WHERE project_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};