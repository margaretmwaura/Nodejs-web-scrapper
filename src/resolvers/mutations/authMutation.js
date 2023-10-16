module.exports.checkAuth = async (_, { authorized }, context) => {
  if (authorized) {
    return "You are so much authorized to do this";
  } else {
    return "You are not authorized to do this";
  }
};
