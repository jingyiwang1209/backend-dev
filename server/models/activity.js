"use strict";
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
    location: DataTypes.STRING,
    departdate: DataTypes.STRING,
    finishdate: DataTypes.STRING,
    budget: DataTypes.STRING,
    services: {
      type:DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue:[],
    },
    story: DataTypes.STRING,
    images: {
      type:DataTypes.ARRAY(DataTypes.BLOB),
      defaultValue:[],
    },

  });

  Activity.associate = function(models) {
    Activity.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Activity;
};