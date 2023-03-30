var DataTypes = require("sequelize").DataTypes;
var _Vowel = require("./vowel");
var _User = require("./user");

function initModels(sequelize) {
  var Vowel = _Vowel(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  return {
    Vowel,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
