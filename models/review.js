module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tool_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    rating: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: DataTypes.TEXT,
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'reviews',
    underscored: true,
    timestamps: true,
  });

  Review.associate = models => {
    Review.belongsTo(models.User, { foreignKey: 'user_id' });
    Review.belongsTo(models.Tool, { foreignKey: 'tool_id' });
  };

  return Review;
};
