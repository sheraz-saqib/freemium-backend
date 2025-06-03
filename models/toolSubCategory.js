module.exports = (sequelize, DataTypes) => {
  const ToolSubCategory = sequelize.define('ToolSubCategory', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    tool_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    subcategory_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  }, {
    tableName: 'tool_subcategories',
    timestamps: false,
  });

  ToolSubCategory.associate = (models) => {
    ToolSubCategory.belongsTo(models.Tool, {
      foreignKey: 'tool_id',
      as: 'tool',
    });

    ToolSubCategory.belongsTo(models.SubCategory, {
      foreignKey: 'subcategory_id',
      as: 'subcategory',
    });
  };

  return ToolSubCategory;
};
