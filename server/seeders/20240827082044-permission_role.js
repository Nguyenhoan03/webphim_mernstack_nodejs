'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Bulk insert entries into the permission_role table
    await queryInterface.bulkInsert('permission_role', [
      {
        roleid: 2,
        permissionid: 1
      },
      {
        roleid: 2,
        permissionid: 2
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove the entries that were added in the up method
    await queryInterface.bulkDelete('permission_role', {
      roleid: 2,
      permissionid: {
        [Sequelize.Op.in]: [1, 2]
      }
    }, {});
  }
};
