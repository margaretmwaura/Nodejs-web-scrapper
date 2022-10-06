var DataTypes = require("sequelize").DataTypes;
var _Vowels = require("./Vowels");

function initModels(sequelize) {
  var Vowels = _Vowels(sequelize, DataTypes);


  return {
    Vowels,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
