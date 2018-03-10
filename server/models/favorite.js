"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {
    favorites: DataTypes.ARRAY(DataTypes.INTEGER),
    // defaultValue: []
  });

  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };

  return Favorite;
};