module.exports = (sequelize, DataTypes) => {
    const Content = sequelize.define('Content', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM('blog', 'news', 'page'),
            allowNull: false,
            defaultValue: 'blog',
        },
        meta_title: DataTypes.STRING(255),
        meta_description: DataTypes.STRING(500),
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
    }, {
        tableName: 'content',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Content.associate = models => {
        Content.belongsTo(models.User, {
            foreignKey: 'author_id',
            onDelete: 'SET NULL',
        });
    };

    return Content;
};
