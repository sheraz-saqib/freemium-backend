module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define("SubCategory", {
        category_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(100),
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
        tableName: 'subcategories',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    SubCategory.associate = (models) => {
        // SubCategory belongs to Category
        SubCategory.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });

        // SubCategory has many Tools
        SubCategory.hasMany(models.Tool, {
            foreignKey: 'subcategory_id',
            as: 'tools',
        });
    };

    return SubCategory;
};
