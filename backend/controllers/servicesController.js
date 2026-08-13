import db from "../config/db.js";

export const getServices = async (req, res) => {
  try {
    const [services] = await db.query(
      "SELECT * FROM services ORDER BY service_id ASC"
    );

    res.status(200).json(services);
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const [services] = await db.query(
      "SELECT * FROM services WHERE service_id = ?",
      [id]
    );

    if (services.length === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json(services[0]);
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      message: "Failed to fetch service",
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, short_description, icon, image } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Service title is required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO services
      (title, short_description, icon, image)
      VALUES (?, ?, ?, ?)`,
      [title, short_description, icon, image]
    );

    res.status(201).json({
      message: "Service created successfully",
      service_id: result.insertId,
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      message: "Failed to create service",
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, short_description, icon, image } = req.body;

    const [result] = await db.query(
      `UPDATE services
       SET
        title = ?,
        short_description = ?,
        icon = ?,
        image = ?
       WHERE service_id = ?`,
      [title, short_description, icon, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      message: "Failed to update service",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM services WHERE service_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      message: "Failed to delete service",
    });
  }
};