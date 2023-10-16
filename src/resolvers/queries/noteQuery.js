const { sequelize } = require("sequelize");
const { Note } = require("../../../models");
const { Op } = require("sequelize");

module.exports.getNotes = async (_, { user_id }, context) => {
  try {
    const notes = await Note.findAll({
      where: {
        UserId: {
          [Op.eq]: user_id,
        },
      },
    });
    return notes;
  } catch (err) {
    console.log(err);
  }
};
