const { sequelize } = require("sequelize");
const { Vowel } = require("../../../models");
const { Op } = require("sequelize");

module.exports.getVowels = async () => {
  try {
    const vowels = await Vowel.findAll({});
    return vowels;
  } catch (err) {
    console.log(err);
  }
};
