const { createVowel, deleteVowels } = require("./vowelMutation");
const { registerUser, login } = require("./userMutation");
const { checkAuth } = require("./authMutation");
const {
  createToDoList,
  updateTodoListItem,
  addTodoListItem,
  deleteTodoListItem,
} = require("./todoListMutation");
const { createNote } = require("./noteMutation");
module.exports.Mutation = {
  createVowel,
  deleteVowels,
  registerUser,
  login,
  checkAuth,
  createToDoList,
  updateTodoListItem,
  addTodoListItem,
  deleteTodoListItem,
  createNote,
};
