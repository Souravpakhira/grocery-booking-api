'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt();
    const hashedPasswordUser = await bcrypt.hash('user1', salt);
    const hashedPasswordAdmin = await bcrypt.hash('admin', salt);

    // Insert default users
    await queryInterface.bulkInsert('users', [
      {
        userName: 'user1',
        password: hashedPasswordUser,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'admin1',
        password: hashedPasswordAdmin,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
