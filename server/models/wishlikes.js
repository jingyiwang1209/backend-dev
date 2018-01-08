'use strict';
module.exports = (sequelize, DataTypes) => {
  var WishLikes = sequelize.define('WishLikes', {
    numOfLikes: DataTypes.INTEGER,
    userMarkers: DataTypes.STRING
  });

  WishLikes.associate = function(models) {
    WishLikes.belongsTo(models.Wish, {
      foreignKey: 'wishId',
      onDelete: 'CASCADE',
    });
  };
  return WishLikes;
};