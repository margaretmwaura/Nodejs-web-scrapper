const { getVowels } = require("./vowelQuery");
const { getUser } = require("./userQuery");
const { getTodoList, getTodaysToDoList } = require("./todoListQuery");
const { getNotes } = require("./noteQuery");

module.exports.Query = {
  getVowels,
  getUser,
  getTodoList,
  getTodaysToDoList,
  getNotes,
};
