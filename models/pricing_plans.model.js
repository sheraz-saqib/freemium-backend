const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const PricingPlans = sequelize.define(
  "PricingPlans",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pricing_plans",
    timestamps: true,
  }
);

module.exports = PricingPlans;
