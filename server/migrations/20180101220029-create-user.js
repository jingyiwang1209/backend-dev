'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mail: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      yearOfLiving: {
        type: Sequelize.INTEGER
      },
      hometown: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      major: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      hobby: {
        type: Sequelize.STRING
      },
      personality: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};