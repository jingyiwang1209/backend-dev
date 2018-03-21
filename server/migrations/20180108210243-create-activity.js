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
      theme: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departdate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      finishdate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      budget: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numberOfPeople:{
         type: Sequelize.INTEGER
      },
      services: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      story: {
        allowNull: false,
        type: Sequelize.STRING
      },

      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Activities');
  }
};