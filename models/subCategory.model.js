const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SubCategory = sequelize.define(
  "SubCategory",
  {
    category_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "subcategory",
    timestamps: true,
  }
);

module.exports = SubCategory;
