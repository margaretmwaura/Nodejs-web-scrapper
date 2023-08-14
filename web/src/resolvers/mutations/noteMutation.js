const moment = require("moment");
const { sequelize } = require("sequelize");
const { Note } = require("../../../models");
const { pubsub } = require("./../../pubSub");

module.exports.createNote = async (_, { input }) => {
  let { topic, content, user_id } = input;

  console.log("We are adding a note");
  console.log(input);

  try {
    let newNote = await Note.create({
      topic: topic,
      content: content,
      UserId: user_id,
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

module.exports.deleteNote = async (_, { id }) => {
  try {
    let note = await Note.findOne({
      where: { id: id },
    });

    await Note.destroy({
      where: { id: id },
    });

    pubsub.publish("NOTE_SUB", {
      noteSubcription: {
        mutation: "Delete",
        data: note,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return "Note has been deleted successfully";
};
