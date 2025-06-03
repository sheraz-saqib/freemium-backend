module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'tags',
    timestamps: false,
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Tool, {
      through: models.ToolTag, // Use the correct pivot model
      as: 'tools',
      foreignKey: 'tag_id',
      otherKey: 'tool_id',
      timestamps: false, // Ensure no timestamps for the pivot table
    });
  };

  return Tag;
};
