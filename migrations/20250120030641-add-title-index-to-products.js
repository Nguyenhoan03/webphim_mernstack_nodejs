'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('products', ['title'], {
      name: 'title_index'
    });
    
    await queryInterface.addIndex('products', ['views'], {
      name: 'views_index'
    });
    
    await queryInterface.addIndex('products', ['category_id'], {
      name: 'category_id_index'
    });
    
    await queryInterface.addIndex('products', ['sotap', 'thoiluong'], {
      name: 'sotap_thoiluong_index'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('products', 'title_index');
    await queryInterface.removeIndex('products', 'views_index');
    await queryInterface.removeIndex('products', 'category_id_index');
    await queryInterface.removeIndex('products', 'sotap_thoiluong_index');
  }
};