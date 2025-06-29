const Testimonial = require("../models/testimonial.model");

// Create
const addTestimonial = async (req, res) => {
  try {
    const { name, designation, message, image } = req.body;

    if (!name || !designation || !message) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const newTestimonial = await Testimonial.create({ name, designation, message, image });

    return res.status(201).json({
      message: "Testimonial added successfully",
      success: true,
      testimonial: newTestimonial,
    });
  } catch (err) {
    console.error("Error adding testimonial:", err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Read
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    return res.status(200).json({
      message: "Testimonials fetched successfully",
      success: true,
      totalCount: testimonials.length,
      testimonials,
    });
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Update
const editTestimonial = async (req, res) => {
  try {
    const { id, name, designation, message, image } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Testimonial ID is required", success: false });
    }

    const [updated] = await Testimonial.update(
      { name, designation, message, image },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Testimonial not found", success: false });
    }

    const updatedTestimonial = await Testimonial.findOne({ where: { id } });

    return res.status(200).json({
      message: "Testimonial updated successfully",
      success: true,
      testimonial: updatedTestimonial,
    });
  } catch (err) {
    console.error("Error updating testimonial:", err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Delete
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Testimonial ID is required", success: false });
    }

    const deleted = await Testimonial.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "Testimonial not found", success: false });
    }

    return res.status(200).json({
      message: "Testimonial deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting testimonial:", err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  addTestimonial,
  getAllTestimonials,
  editTestimonial,
  deleteTestimonial,
};
