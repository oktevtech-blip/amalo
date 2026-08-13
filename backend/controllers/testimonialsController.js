import db from "../config/db.js";

export const getTestimonials = async (req, res) => {
  try {
    const [testimonials] = await db.query(
      "SELECT * FROM testimonials ORDER BY testimonial_id ASC"
    );

    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Get testimonials error:", error);

    res.status(500).json({
      message: "Failed to fetch testimonials",
    });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    const [testimonials] = await db.query(
      "SELECT * FROM testimonials WHERE testimonial_id = ?",
      [id]
    );

    if (testimonials.length === 0) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.status(200).json(testimonials[0]);
  } catch (error) {
    console.error("Get testimonial error:", error);

    res.status(500).json({
      message: "Failed to fetch testimonial",
    });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const {
      client_name,
      company,
      review,
      image,
    } = req.body;

    if (!client_name) {
      return res.status(400).json({
        message: "Client name is required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO testimonials
      (client_name, company, review, image)
      VALUES (?, ?, ?, ?)`,
      [
        client_name,
        company,
        review,
        image,
      ]
    );

    res.status(201).json({
      message: "Testimonial created successfully",
      testimonial_id: result.insertId,
    });
  } catch (error) {
    console.error("Create testimonial error:", error);

    res.status(500).json({
      message: "Failed to create testimonial",
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      client_name,
      company,
      review,
      image,
    } = req.body;

    const [result] = await db.query(
      `UPDATE testimonials
       SET
        client_name = ?,
        company = ?,
        review = ?,
        image = ?
       WHERE testimonial_id = ?`,
      [
        client_name,
        company,
        review,
        image,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      message: "Testimonial updated successfully",
    });
  } catch (error) {
    console.error("Update testimonial error:", error);

    res.status(500).json({
      message: "Failed to update testimonial",
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM testimonials WHERE testimonial_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);

    res.status(500).json({
      message: "Failed to delete testimonial",
    });
  }
};