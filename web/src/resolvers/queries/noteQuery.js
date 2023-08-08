const { sequelize } = require("sequelize");
const { Note } = require("../../../models");
const { Op } = require("sequelize");

module.exports.getNotes = async () => {
  try {
    const notes = await Note.findAll({});
    return notes;
  } catch (err) {
    console.log(err);
  }
};
