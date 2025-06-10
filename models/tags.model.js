const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Tags = sequelize.define(
  "Tags",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tags",
    timestamps: true,
  }
);

module.exports = Tags;
