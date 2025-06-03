module.exports = (sequelize, DataTypes) => {
    const ToolImage = sequelize.define('ToolImage', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        tool_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        caption: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'created_at', // Mapping to the exact column name in the database
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            onUpdate: DataTypes.NOW,
            field: 'updated_at', // Mapping to the exact column name in the database
        },
    }, {
        tableName: 'tool_images',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    ToolImage.associate = (models) => {
        ToolImage.belongsTo(models.Tool, {
            foreignKey: 'tool_id',
            as: 'tool',
        });
    };

    return ToolImage;
};
