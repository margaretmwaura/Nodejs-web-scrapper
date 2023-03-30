const { sequelize } = require("sequelize");
const { Vowel } = require("../../../models");

module.exports.createVowel = async (_, { name, description, filename }) => {
  try {
    (await Vowel) &&
      Vowel.create({
        name: name,
        description: description,
        filename: filename,
      });
    return "Vowel has been created";
  } catch (error) {
    console.log(error);
  }
};
