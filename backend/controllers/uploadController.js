export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      message: "Image uploaded successfully",
      image: imageUrl,
    });
  } catch (error) {
    console.error("Upload image error:", error);

    res.status(500).json({
      message: "Failed to upload image",
    });
  }
};