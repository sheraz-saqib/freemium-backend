const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Testimonial = sequelize.define(
  "Testimonial",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // URL or file path
      allowNull: true,
    },
  },
  {
    tableName: "testimonials",
    timestamps: true,
  }
);

module.exports = Testimonial;
