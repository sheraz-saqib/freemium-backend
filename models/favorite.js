module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      tool_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'favorites',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'tool_id'],
        }
      ]
    });
  
    Favorite.associate = models => {
      Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
      Favorite.belongsTo(models.Tool, { foreignKey: 'tool_id' });
    };
  
    return Favorite;
  };
  