'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 const permission = [
  'VIP1',
  'VIP2',

 ] 
 const permissionsobj = permission.map(name => ({ Name: name }));

 await queryInterface.bulkInsert('permissions', permissionsobj, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
