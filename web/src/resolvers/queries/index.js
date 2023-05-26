const { getVowels } = require("./vowelQuery");
const { getUser } = require("./userQuery");
const { getTodoList, getTodaysToDoList } = require("./todoListQuery");

module.exports.Query = { getVowels, getUser, getTodoList, getTodaysToDoList };
