module.exports = (sequelize, DataTypes) => {
  const PlanFeature = sequelize.define('PlanFeature', {
    subscription_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    feature_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'plan_features',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['subscription_id', 'feature_id'],
      }
    ]
  });

  PlanFeature.associate = models => {
    // Associate PlanFeature with Subscription
    PlanFeature.belongsTo(models.Subscription, {
      foreignKey: 'subscription_id',
      as: 'subscription',
    });

    // Associate PlanFeature with Feature
    PlanFeature.belongsTo(models.Feature, {
      foreignKey: 'feature_id',
      as: 'feature',
    });

    // Associate Subscription with PlanFeature
    models.Subscription.hasMany(PlanFeature, {
      foreignKey: 'subscription_id',
      as: 'plan_features',
    });

    // Associate Feature with PlanFeature
    models.Feature.hasMany(PlanFeature, {
      foreignKey: 'feature_id',
      as: 'plan_features',
    });
  };

  return PlanFeature;
};
