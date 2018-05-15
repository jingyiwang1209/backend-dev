'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    message: DataTypes.STRING,
    activityId: DataTypes.INTEGER,
    toHasRead: DataTypes.BOOLEAN
  });

  return Message;
};