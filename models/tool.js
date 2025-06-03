module.exports = (sequelize, DataTypes) => {
    const Tool = sequelize.define("Tool", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        website_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        pricing_model: {
            type: DataTypes.ENUM('free', 'freemium', 'paid', 'one-time'),
            allowNull: false,
        },
        category_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        subcategory_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        submitted_by: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        view_count: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        click_count: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        upvote_count: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        downvote_count: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        vote_score: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        social_links: {
            type: DataTypes.JSON,
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
            field: 'created_at',
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            onUpdate: DataTypes.NOW,
            field: 'updated_at',
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        tableName: 'tools',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Tool.associate = (models) => {
        // Tool belongs to Category
        Tool.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });

        // Tool belongs to SubCategory
        Tool.belongsTo(models.SubCategory, {
            foreignKey: 'subcategory_id',
            as: 'subcategory',
        });
        
        Tool.hasMany(models.ToolImage, {
            foreignKey: 'tool_id',
            as: 'images',
        });

        // Tool belongs to User (submitted_by)
        Tool.belongsTo(models.User, {
            foreignKey: 'submitted_by',
            as: 'user',
        });

        Tool.belongsToMany(models.Tag, {
            through: models.ToolTag, // Use the correct model name
            as: 'tags',
            foreignKey: 'tool_id',
            otherKey: 'tag_id',
            timestamps: false, // Ensure no timestamps for the pivot table
        });

    };


    return Tool;
};
