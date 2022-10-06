const { sequelize } = require("sequelize");
const { Vowels } = require("../models");

const Query = {
  geVowels: async () => {
    try {
      const vowels = await Vowels.findAll();
      return vowels;
    } catch (err) {
      console.log(err);
    }
  },
};

const Mutation = {
  createVowel: async (_, { name, description, filename }) => {
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
  },
};
module.exports = { Query, Mutation };
