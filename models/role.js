module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    }, {
      tableName: 'roles',
      timestamps: false
    });
  
    Role.associate = models => {
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        as: 'users',
        foreignKey: 'role_id',
        otherKey: 'user_id'
      });
  
      Role.belongsToMany(models.Permission, {
        through: 'role_permissions',
        foreignKey: 'role_id'
      });
    };
  
    return Role;
  };
  