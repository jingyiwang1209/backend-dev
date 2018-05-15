"use strict";

const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["男", "女", "其他"]]
      }
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [
          [
            "18 岁 ~ 23 岁",
            "24 岁 ~ 29 岁",
            "30 岁 ~ 35 岁",
            "36 岁 ~ 41 岁",
            "42 岁 ~ 47 岁",
            "48 岁 ~ 53 岁",
            "54 岁 ~ 59 岁",
            "60 岁 ~ 65 岁"
          ]
        ]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    yearOfLiving: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["1 年 ~ 5 年", "6 年 ~ 10 年", "10 年以上"]]
      }
    },

    school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    language: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,

    },

    imageurl: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Activity, {
      foreignKey: "userId",
      as: "activities"
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
    let password = this.password;
    return new Promise(function(resolve, reject) {
      bcrypt.compare(candidatePassword, password, function(err, res) {
        if (err) reject(err);
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