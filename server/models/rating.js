'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define('Rating', {
    feedback: DataTypes.STRING,
    numOfStars: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.Activity, {
      foreignKey: 'activityId',
      onDelete: 'CASCADE',
    });
  };
  return Rating;
};