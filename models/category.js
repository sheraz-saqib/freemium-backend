module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meta_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at', 
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      onUpdate: DataTypes.NOW,
      field: 'updated_at', 
    },
  }, {
    tableName: 'categories',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Category.associate = (models) => {
    // Category has many SubCategories
    Category.hasMany(models.SubCategory, {
      foreignKey: 'category_id',
      as: 'subcategories',
    });

    // Category has many Tools
    Category.hasMany(models.Tool, {
      foreignKey: 'category_id',
      as: 'tools',
    });
  };

  return Category;
};
