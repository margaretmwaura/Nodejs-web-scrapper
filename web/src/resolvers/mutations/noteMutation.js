const moment = require("moment");
const { sequelize } = require("sequelize");
const { Note } = require("../../../models");
const { pubsub } = require("./../../pubSub");

module.exports.createNote = async (_, { input }) => {
  let { topic, content } = input;

  try {
    let newNote = await Note.create({
      topic: topic,
      content: content,
    });
    pubsub.publish("NOTE_ADDED", {
      noteSubcription: {
        mutation: "Create",
        data: newNote,
      },
    });
    return "Note has been created";
  } catch (error) {
    console.log(error);
  }
};
