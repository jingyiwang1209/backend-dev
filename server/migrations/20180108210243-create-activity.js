"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Activities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 15]
        }
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      departdate: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true
        }
      },
      finishdate: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true
        }
      },
      budget: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true
        }
      },
      numberOfPeople: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      services: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
      },
      story: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 300]
        }
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
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "userId"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Activities");
  }
};