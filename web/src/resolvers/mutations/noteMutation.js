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
    pubsub.publish("NOTE_SUB", {
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

module.exports.updateNote = async (_, { input }) => {
  console.log("Mutation calls for update");
  let note_id = input.id;

  delete input.id;

  try {
    console.log("We are updating");
    await Note.update(input, {
      where: { id: note_id },
    });

    let note = await Note.findOne({
      where: { id: note_id },
    });

    pubsub.publish("NOTE_SUB", {
      noteSubcription: {
        mutation: "Edit",
        data: note,
      },
    });

    return "Note has been updated successfully";
  } catch (error) {
    console.log("Error");
  }
};
