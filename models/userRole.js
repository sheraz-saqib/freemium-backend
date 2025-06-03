module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      role_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    }, {
      tableName: 'user_roles',
      timestamps: false,
      underscored: true,
    });
  
    return UserRole;
  };
  