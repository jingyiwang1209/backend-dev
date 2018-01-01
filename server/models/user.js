"use strict";

const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("User", {
    mail: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    sex: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    yearOfLiving: { type: DataTypes.INTEGER, allowNull: false },
    hometown: DataTypes.STRING,
    school: DataTypes.STRING,
    major: DataTypes.STRING,
    language: DataTypes.STRING,
    hobby: DataTypes.STRING,
    personality: DataTypes.STRING
  });

  User.associate = function(models) {
     User.hasMany(models.Activity, {
      foreignKey: 'userId',
      as:'activities'
     });
  };

  User.prototype.cryptPassword = function(password) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  };

  User.prototype.comparePassword = function(candidatePassword) {
    let password=this.password;
    return new Promise(function(resolve, reject) {
      bcrypt.compare(candidatePassword, password, function(err, res){
         if(err) reject(err);
         resolve(res);
      });
    });
  };

  User.beforeCreate((user, options) => {
    return user
      .cryptPassword(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        if (err) console.log(err);
      });
  });

  return User;
};