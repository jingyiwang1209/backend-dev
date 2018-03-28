"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Wishes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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

      note: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
          len: [0, 300]
        }
      },

      deleteIt:{
        type:Sequelize.BOOLEAN,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
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
    return queryInterface.dropTable("Wishes");
  }
};