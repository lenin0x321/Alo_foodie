'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING(64),
        unique:true
      },
      firstname: {
        type: Sequelize.STRING(64)
      },
      lastname: {
        type: Sequelize.STRING(64)
      },
      phone: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(8)
      },
      dateofbirth: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdby: {
        type: Sequelize.STRING(64),
        defaultValue: "User"
      },
      updatedby: {
        type: Sequelize.STRING,
        defaultValue: "User"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};