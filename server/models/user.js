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
      }

      static async getRolesAndPermissions(userId) {
        try {
          const user = await User.findByPk(userId, {
            include: [{
              model: sequelize.models.roles, 
              as: 'roles',
              attributes: ['Name'], 
              through: { attributes: [] },
              include: [{
                model: sequelize.models.permissions, 
                as: 'permissions', 
                attributes: ['Name'],
                through: { attributes: [] }
              }]
            }]
          });
          
          if (!user) {
            throw new Error('User not found');
          }
      
          const roles = user.roles.map(role => role.Name);
          const permissions = user.roles.flatMap(role => role.permissions.map(permission => permission.Name));
      
          return { roles, permissions };
        } catch (error) {
          console.error("Error in getRolesAndPermissions:", error);
          throw error;
        }
      }
      

      
    }
    
    User.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'User',
    });
    return User;
  };
 