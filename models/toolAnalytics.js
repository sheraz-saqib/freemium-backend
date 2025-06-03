module.exports = (sequelize, DataTypes) => {
    const ToolAnalytics = sequelize.define('ToolAnalytics', {
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
            allowNull: true,
        },
        action_type: {
            type: DataTypes.ENUM('view', 'click', 'conversion'),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'created_at', 
        },
    }, {
        tableName: 'tool_analytics',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    ToolAnalytics.associate = models => {
        ToolAnalytics.belongsTo(models.Tool, { foreignKey: 'tool_id' });
        ToolAnalytics.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return ToolAnalytics;
};
