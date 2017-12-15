'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    mail: {type:DataTypes.STRING, allowNull:false},
    password: {type:DataTypes.STRING, allowNull:false},
    username: {type:DataTypes.STRING, allowNull:false},
    sex: {type:DataTypes.STRING, allowNull:false},
    age: {type: DataTypes.INTEGER, allowNull:false},
    city: {type: DataTypes.STRING, allowNull:false},
    yearOfLiving: {type:DataTypes.INTEGER, allowNull:false},
    hometown: DataTypes.STRING,
    school: DataTypes.STRING,
    major: DataTypes.STRING,
    language: DataTypes.STRING,
    hobby: DataTypes.STRING,
    personality: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};