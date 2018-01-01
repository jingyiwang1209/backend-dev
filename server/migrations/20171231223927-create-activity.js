'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      departdate: {
        type: Sequelize.STRING
      },
      finishdate: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.ARRAY
      },
      story: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.ARRAY
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Activities');
  }
};