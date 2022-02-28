'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('useraddresses', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userid:{
        type:Sequelize.STRING(64)
      },
      name:{
        type: Sequelize.STRING(32)
      },
      addressline1:{
        type: Sequelize.STRING(128)
      },
      addressline2:{
        type: Sequelize.STRING(128)
      },
      city:{
        type: Sequelize.STRING(128)
      },
      state:{
        type: Sequelize.STRING(128)
      },
      city:{
        type: Sequelize.STRING(128)
      },
      landmark:{
        type: Sequelize.STRING(128)
      },
      district:{
        type: Sequelize.STRING(128)
      },
      state:{
        type: Sequelize.STRING(128)
      },
      country:{
        type: Sequelize.STRING(128)
      },
      pincode:{
        type: Sequelize.STRING(16)
      },
      latitude:{
        type: Sequelize.FLOAT
      },
      longitude:{
        type: Sequelize.FLOAT
      },
      status:{
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      createdby:{
        type: Sequelize.STRING(64),
        defaultValue: 'User'
      },
      updatedby:{
        type: Sequelize.STRING(64),
        defaultValue: 'User'
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
    await queryInterface.dropTable('useraddresses');
  }
};