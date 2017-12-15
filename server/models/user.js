"use strict";

const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
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
    }
  );

  user.associate = function(model) {};

  user.prototype.cryptPassword = function(password) {
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

  user.beforeCreate((user, options) => {
    return user.cryptPassword(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        if (err) console.log(err);
      });
  });

  return user;
};