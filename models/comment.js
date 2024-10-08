'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id', // Khóa ngoại trong bảng Comment
        targetKey: 'id',       // Khóa chính trong bảng User
        as: 'users'
      });
      
    }
  }
  Comment.init({
    titlefilm: DataTypes.STRING,
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
