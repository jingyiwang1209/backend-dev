"use strict";
module.exports = (sequelize, DataTypes) => {
  const Demand = sequelize.define("Demand", {
    location: DataTypes.STRING,
    departdate: DataTypes.STRING,
    finishdate: DataTypes.STRING,
    budget: DataTypes.STRING,
    services: {
      type:DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue:[],
    }

  });

  Demand.associate = function(models) {
    Demand.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Demand;
};