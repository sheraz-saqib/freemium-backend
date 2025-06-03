module.exports = (sequelize, DataTypes) => {
    const ToolVote = sequelize.define('ToolVote', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      tool_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      vote_type: {
        type: DataTypes.ENUM('upvote', 'downvote'),
        allowNull: false,
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
      tableName: 'tool_votes',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    ToolVote.associate = (models) => {
      ToolVote.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
  
      ToolVote.belongsTo(models.Tool, {
        foreignKey: 'tool_id',
        as: 'tool',
      });
    };
  
    return ToolVote;
  };
  