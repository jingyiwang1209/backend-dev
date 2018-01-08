'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActivityLikes = sequelize.define('ActivityLikes', {
    numOfLikes: DataTypes.INTEGER,
    userMarkers: DataTypes.STRING
  });

   ActivityLikes.associate = function(models) {
    ActivityLikes.belongsTo(models.Activity, {
      foreignKey: 'activityId',
      onDelete: 'CASCADE',
    });
  };

  return ActivityLikes;
};