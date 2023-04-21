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

module.exports.deleteVowels = async (_, {}) => {
  Vowel.destroy({
    where: {},
    truncate: true,
  })
    .then(function () {
      console.log("Data deleted"); // Success
      return "All Vowels have been deleted";
    })
    .catch(function (error) {
      console.log(error); // Failure
      return "Deleting of vowels was not successful";
    });
};
