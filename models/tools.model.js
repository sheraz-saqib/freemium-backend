const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Tools = sequelize.define(
  "Tools",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    visit_link: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pricing_plan_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    X: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tools",
    timestamps: true,
  }
);

module.exports = Tools;
