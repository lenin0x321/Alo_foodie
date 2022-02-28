'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      userid:{ 
        type: Sequelize.UUID,
        primaryKey: true,
        unique:true
      },
      successfullogin:{
        type: Sequelize.STRING(64),
        allowNull:false
      },
      failedlogin:{
        type: Sequelize.STRING(64),
      },
      invalidloginattempt:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('logins');
  }
};