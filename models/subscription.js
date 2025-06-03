module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('Subscription', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        plan_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'canceled'),
            defaultValue: 'active',
        },
        start_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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
        end_date: DataTypes.DATE,
        payment_provider: DataTypes.STRING(50),
        payment_id: DataTypes.STRING(255),
    }, {
        tableName: 'subscriptions',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Subscription.associate = models => {
        Subscription.belongsTo(models.User, { foreignKey: 'user_id' });
        Subscription.hasMany(models.PlanFeature, { foreignKey: 'subscription_id' });
    };
    
    return Subscription;
};
