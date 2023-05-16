const { getVowels } = require("./vowelQuery");
const { getUser } = require("./userQuery");
const { getTodoList } = require("./todoListQuery");

module.exports.Query = { getVowels, getUser, getTodoList };
