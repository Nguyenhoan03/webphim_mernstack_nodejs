'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Linkfilm, {
        foreignKey: 'title', 
        sourceKey: 'title', 
        as: 'linkfilms'
      });
    }
  }
  
  Product.init({
    title: DataTypes.TEXT,
    hinhanh: DataTypes.TEXT,
    nameenglish: DataTypes.TEXT,
    trangthai: DataTypes.TEXT,
    sotap: DataTypes.TEXT,
    thoiluong: DataTypes.TEXT,
    namphathanh: DataTypes.TEXT,
    chatluong: DataTypes.TEXT,
    ngonngu: DataTypes.TEXT,
    daodien: DataTypes.TEXT,
    dienvien: DataTypes.TEXT,
    theloai: DataTypes.TEXT,
    quocgia: DataTypes.TEXT,
    descripts: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    VIP1: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: false, 
    tableName: 'products'
  });
  return Product;
};