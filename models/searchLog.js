module.exports = (sequelize, DataTypes) => {
    const SearchLog = sequelize.define('SearchLog', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        query: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
    }, {
        tableName: 'search_logs',
        underscored: true,
        timestamps: false, // Disables automatic updatedAt management
        createdAt: 'created_at',
        updatedAt: false, // Explicitly disable updated_at
    });
    
    SearchLog.associate = models => {
        SearchLog.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'SET NULL',
        });
    };

    return SearchLog;
};
