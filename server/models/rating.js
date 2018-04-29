"use strict";
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define("Rating", {
    numOfStars: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        isIn: [[1, 2, 3, 4, 5]]
      }
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },

    feedback: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 300]
      }
    },

    replyToId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },

    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {
      foreignKey: "creatorId",
      onDelete: "CASCADE"
    });
    Rating.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Rating;
};