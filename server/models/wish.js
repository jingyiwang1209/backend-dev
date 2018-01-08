"use strict";
module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define("Wish", {
    location: DataTypes.STRING,
    departdate: DataTypes.STRING,
    finishdate: DataTypes.STRING,
    budget: DataTypes.STRING,
    services: {
      type:DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue:[],
    }

  });

  Wish.associate = function(models) {
    Wish.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Wish;
};