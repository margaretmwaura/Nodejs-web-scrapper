const { createVowel, deleteVowels } = require("./vowelMutation");
const { registerUser, login } = require("./userMutation");
const { checkAuth } = require("./authMutation");
const {
  createToDoList,
  updateTodoListItem,
  addTodoListItem,
} = require("./todoListMutation");
module.exports.Mutation = {
  createVowel,
  deleteVowels,
  registerUser,
  login,
  checkAuth,
  createToDoList,
  updateTodoListItem,
  addTodoListItem,
};
