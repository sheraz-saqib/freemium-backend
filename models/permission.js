module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define("Permission", {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    }, {
      tableName: 'permissions',
      timestamps: false
    });
  
    Permission.associate = models => {
      Permission.belongsToMany(models.Role, {
        through: 'role_permissions',
        foreignKey: 'permission_id'
      });
    };
  
    return Permission;
  };
  