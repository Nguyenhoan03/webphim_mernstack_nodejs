'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission_role extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  permission_role.init({
    roleid: DataTypes.INTEGER,
    permissionid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'permission_role',
  });
  return permission_role;
};