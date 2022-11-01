const { createVowel } = require("./vowelMutation");
const { registerUser, login } = require("./userMutation");
module.exports.Mutation = { createVowel, registerUser, login };
