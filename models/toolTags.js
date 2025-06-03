module.exports = (sequelize, DataTypes) => {
  const ToolTag = sequelize.define('ToolTag', {
      tool_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          references: {
              model: 'tools',
              key: 'id',
          },
          onDelete: 'CASCADE',
      },
      tag_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          references: {
              model: 'tags',
              key: 'id',
          },
          onDelete: 'CASCADE',
      },
  }, {
      tableName: 'tool_tags',
      timestamps: false,
  });

  return ToolTag;
};
