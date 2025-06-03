module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    plan_type: {
      type: DataTypes.ENUM("free", "premium"),
      defaultValue: "free",
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    oauth_provider: {
      type: DataTypes.ENUM("google", "github", "facebook"),
      allowNull: true,
    },
    oauth_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  User.associate = (models) => {
    // User <-> Role (Many-to-Many)
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      as: 'roles',
      foreignKey: 'user_id',
      otherKey: 'role_id'
    });
  
    // User -> UserActivityLog (One-to-Many)
    User.hasMany(models.UserActivityLog, {
      foreignKey: 'user_id'
    });
  };
  

  return User;
};
