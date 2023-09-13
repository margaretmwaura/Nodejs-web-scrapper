const { getVowels } = require("./vowelQuery");
const { getUser } = require("./userQuery");
const {
  getTodoList,
  getTodaysToDoList,
  getThisWeeksToDoList,
} = require("./todoListQuery");
const { getNotes } = require("./noteQuery");

module.exports.Query = {
  getVowels,
  getUser,
  getNotes,
  getTodoList,
  getTodaysToDoList,
  getThisWeeksToDoList,
};
