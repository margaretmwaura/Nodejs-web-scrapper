// FIXME: Change this to be using the bearer token format
async function getUserFromSession(req) {
  try {
    console.log("we is here start");
    console.log(req.headers);
    if (req.headers && req.headers.authtoken) {
      console.log("we is here authenticated" + req.headers.authtoken);
      let token = admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        .then(() => {
          return req.headers.authtoken;
        })
        .catch(() => {
          throw new Error("Unauthorized");
        });

      return token;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error(`Cannot get user from session: \n ${error}`);
  }
}

async function addTokenToArgs(resolve, parent, args, context, info) {
  console.log("middleware was called");
  const token = await getUserFromSession(context.req);
  const argsWithToken = { token, ...args };

  return resolve(parent, argsWithToken, context, info);
}

module.exports = {
  Query: {
    getVowels: addTokenToArgs,
  },
  Mutation: {
    // registerUser: addTokenToArgs,
  },
};
