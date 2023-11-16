const { createVowel, deleteVowels } = require("./vowelMutation");
const { registerUser } = require("./userMutation");
const { checkAuth } = require("./authMutation");
const {
  createToDoList,
  updateTodoListItem,
  addTodoListItem,
  deleteTodoListItem,
} = require("./todoListMutation");
const { createNote, updateNote, deleteNote } = require("./noteMutation");
module.exports.Mutation = {
  createVowel,
  deleteVowels,
  registerUser,
  checkAuth,
  createToDoList,
  updateTodoListItem,
  addTodoListItem,
  deleteTodoListItem,
  createNote,
  updateNote,
  deleteNote,
};
