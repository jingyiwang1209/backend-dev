"use strict";
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define("Rating", {
    feedback: DataTypes.STRING,
    numOfStars: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    activityId:DataTypes.INTEGER,
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {
      foreignKey: "creatorId",
      onDelete: "CASCADE"
    });
  };
  return Rating;
};