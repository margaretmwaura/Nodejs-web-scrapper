const { sequelize } = require("sequelize");
const { Note } = require("../../../models");

module.exports.createNote = async (_, { input }) => {
  let { topic, content } = input;

  try {
    (await Note) &&
      Note.create({
        topic: topic,
        content: content,
      });
    return "Note has been created";
  } catch (error) {
    console.log(error);
  }
};
