const { createVowel, deleteVowels } = require("./vowelMutation");
const { registerUser, login } = require("./userMutation");
const { checkAuth } = require("./authMutation");
module.exports.Mutation = {
  createVowel,
  deleteVowels,
  registerUser,
  login,
  checkAuth,
};
