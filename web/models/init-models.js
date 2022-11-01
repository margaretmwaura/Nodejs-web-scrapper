var DataTypes = require("sequelize").DataTypes;
var _Vowels = require("./Vowels");
var _User = require("./user");

function initModels(sequelize) {
  var Vowels = _Vowels(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  return {
    Vowels,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
