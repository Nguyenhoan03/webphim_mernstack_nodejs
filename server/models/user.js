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