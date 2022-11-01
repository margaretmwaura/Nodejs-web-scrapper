const { sequelize } = require("sequelize");
const { Vowels } = require("../../../models");

module.exports.createVowel = async (_, { name, description, filename }) => {
  try {
    (await Vowels) &&
      Vowels.create({
        name: name,
        description: description,
        filename: filename,
      });
    return "Vowel has been created";
  } catch (error) {
    console.log(error);
  }
};
