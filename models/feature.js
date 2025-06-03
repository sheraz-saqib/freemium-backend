module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: DataTypes.TEXT,
      is_premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at', 
    },
    }, {
      tableName: 'features',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    });
    
    Feature.associate = models => {
      Feature.hasMany(models.PlanFeature, { foreignKey: 'feature_id' });
    };
    
    return Feature;
  };
  