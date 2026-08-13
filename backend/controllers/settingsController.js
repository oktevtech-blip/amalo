import db from "../config/db.js";

export const getSettings = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM site_settings ORDER BY setting_id ASC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Site settings not found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      message: "Failed to fetch site settings",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const {
      company_name,
      eyebrow,
      tagline,
      intro,
      phone,
      email,
      website,
      location,
      hero_image,
      footer_note,
    } = req.body;

    const [existing] = await db.query(
      "SELECT setting_id FROM site_settings ORDER BY setting_id ASC LIMIT 1"
    );

    if (existing.length === 0) {
      const [result] = await db.query(
        `INSERT INTO site_settings
        (
          company_name,
          eyebrow,
          tagline,
          intro,
          phone,
          email,
          website,
          location,
          hero_image,
          footer_note
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          company_name,
          eyebrow,
          tagline,
          intro,
          phone,
          email,
          website,
          location,
          hero_image,
          footer_note,
        ]
      );

      return res.status(201).json({
        message: "Site settings created successfully",
        setting_id: result.insertId,
      });
    }

    await db.query(
      `UPDATE site_settings
       SET
        company_name = ?,
        eyebrow = ?,
        tagline = ?,
        intro = ?,
        phone = ?,
        email = ?,
        website = ?,
        location = ?,
        hero_image = ?,
        footer_note = ?
       WHERE setting_id = ?`,
      [
        company_name,
        eyebrow,
        tagline,
        intro,
        phone,
        email,
        website,
        location,
        hero_image,
        footer_note,
        existing[0].setting_id,
      ]
    );

    res.status(200).json({
      message: "Site settings updated successfully",
    });
  } catch (error) {
    console.error("Update settings error:", error);

    res.status(500).json({
      message: "Failed to update site settings",
    });
  }
};