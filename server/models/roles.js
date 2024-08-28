'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models.User, {
        through: models.role_user,
        foreignKey: 'roleid',
        otherKey: 'userid',
        as: 'users'
      });

     
      roles.belongsToMany(models.permissions, {
        through: models.permission_role,
        foreignKey: 'roleid',
        otherKey: 'permissionid',
        as: 'permissions'
      });
    }
  }
 
  roles.init({
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};