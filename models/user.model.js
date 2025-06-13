const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserModal = sequelize.define('User', {
 fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
    username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
   isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false
  }
}, {
  tableName: 'users', 
  timestamps: true    
});

module.exports = UserModal;
