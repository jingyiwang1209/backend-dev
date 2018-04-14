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
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 20]
        }
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIn: [["男", "女", "其他"]]
        }
      },
      age: {
        type: Sequelize.STRING,
        allowNull: true,
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
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      yearOfLiving: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIn: [["1 年 ~ 5 年", "6 年 ~ 10 年", "10 年以上"]]
        }
      },

      school: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      language: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: [],
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
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