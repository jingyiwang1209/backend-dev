"use strict";
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
    theme:DataTypes.STRING,
    location: DataTypes.STRING,
    departdate: DataTypes.STRING,
    finishdate: DataTypes.STRING,
    budget: DataTypes.STRING,
    services: {
      type:DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue:[],
    },
    story: DataTypes.STRING,


  });

  Activity.associate = function(models) {
    Activity.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Activity;
};