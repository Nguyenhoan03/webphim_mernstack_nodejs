  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        User.hasMany(models.Comment, {
          foreignKey: 'user_id',
          sourceKey: 'id',
          as: 'comments'
        });
        User.hasOne(models.Rating, { // Correct reference to Rating model
          foreignKey: 'user_id',
          sourceKey: 'id',
          as: 'ratings'
        });
        User.belongsToMany(models.roles, {
          through: models.role_user,
          foreignKey: 'userid',
          otherKey: 'roleid',
          as: 'roles'
        });
        User.belongsToMany(models.permissions, {
          through: models.user_permissions, 
          foreignKey: 'userid',
          otherKey: 'permissionid',
          as: 'permissions'
        });
      }

      static async getRoles(userId) {
        try {
          const user = await User.findByPk(userId, {
            include: [{
              model: sequelize.models.roles, 
              as: 'roles',
              attributes: ['Name'], 
              through: { attributes: [] },
             
            }]
          });
          
          if (!user) {
            throw new Error('User not found');
          }
      
          const roles = user.roles.map(role => role.Name);
      
          return { roles };
        } catch (error) {
          console.error("Error in getRolesAndPermissions:", error);
          throw error;
        }
      }

      static async getPermissions(userId) {
        try {
          const userPermissions = await sequelize.models.user_permissions.findAll({
            where: { userid: userId },
            include: [{
              model: sequelize.models.permissions,
              as: 'permission',
              attributes: ['Name']
            }]
          });
          const permissions = userPermissions.map(up => up.permission.Name);
          return permissions;
        } catch (error) {
          console.error("Error in getPermissions:", error);
          throw error;
        }
      }
    }
    
    User.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'users',
    });
    return User;
  };
 
