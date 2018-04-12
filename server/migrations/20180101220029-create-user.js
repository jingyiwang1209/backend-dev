"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: 6
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["男", "女", "其他"]]
        }
      },
      age: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              "18 岁 ~ 23 岁",
              "24 岁 ~ 29 岁",
              "30 岁 ~ 35 岁",
              "36 岁 ~ 41 岁",
              "42 岁 ~ 47 岁",
              "48 岁 ~ 53 岁",
              "54 岁 ~ 59 岁",
              "60 岁 ~ 65 岁"
            ]
          ]
        }
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      yearOfLiving: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hometown: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      school: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      major: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      hobby: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      personality: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      imageurl: {
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
    return queryInterface.dropTable("Users");
  }
};