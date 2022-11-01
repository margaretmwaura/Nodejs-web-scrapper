const { sequelize } = require("sequelize");
const { Vowels } = require("../../../models");

module.exports.getVowels = async () => {
  try {
    const vowels = await Vowels.findAll();
    return vowels;
  } catch (err) {
    console.log(err);
  }
};
