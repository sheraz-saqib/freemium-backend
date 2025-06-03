module.exports = (sequelize, DataTypes) => {
    const UserActivityLog = sequelize.define('UserActivityLog', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
      },
      activity_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      activity_details: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'user_activity_logs',
      timestamps: false
    });
  
    UserActivityLog.associate = (models) => {
      UserActivityLog.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL'
      });
    };
  
    return UserActivityLog;
  };
  