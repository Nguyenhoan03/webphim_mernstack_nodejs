'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_permissions extends Model {
    static associate(models) {
      user_permissions.belongsTo(models.permissions, {
        foreignKey: 'permissionid',
        as: 'permission'
      });

      user_permissions.belongsTo(models.User, {
        foreignKey: 'userid',
        as: 'user'
      });
    }
  }
  user_permissions.init({
    userid: DataTypes.INTEGER,
    permissionid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_permissions',
  });
  return user_permissions;
};
