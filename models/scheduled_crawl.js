'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scheduled_crawl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  scheduled_crawl.init({
    category: DataTypes.TEXT,
    crawl_date: DataTypes.DATEONLY,
    crawl_time: DataTypes.TIME,
    status: DataTypes.INTEGER,
    
  }, {
    sequelize,
    timestamps: false, 
    modelName: 'scheduled_crawl',
  })
  return scheduled_crawl;
};
