const { createVowel } = require("./vowelMutation");
const { registerUser, login } = require("./userMutation");
const { checkAuth } = require("./authMutation");
module.exports.Mutation = { createVowel, registerUser, login, checkAuth };
