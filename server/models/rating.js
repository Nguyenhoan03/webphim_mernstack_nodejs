'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
   
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: 'user_id', // Khóa ngoại trong bảng Rating
        targetKey: 'id',       // Khóa chính trong bảng User
        as: 'users'
      });
      
    }
  }
  Rating.init({
    titlefilm: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};