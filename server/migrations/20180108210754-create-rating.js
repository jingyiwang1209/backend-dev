"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Ratings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      numOfStars: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          isIn: [[1, 2, 3, 4, 5]]
        }
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      replyToId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },

      feedback: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0, 300]
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },

      activityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      creatorId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "creatorId"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Ratings");
  }
};