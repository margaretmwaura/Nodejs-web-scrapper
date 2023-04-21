require("dotenv").config({ path: "../.env" });

const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const fs = require("fs");
const { typeDefs } = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const { shield, rule, allow, deny, and } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("graphql-tools");
const middleware = require("./src/middleware");
const executableSchema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(executableSchema, ...middleware);
const admin = require("firebase-admin");
const serviceAccount = require("./config/fbServiceAccountKey.json");

global.admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  // FIXME: This should be moved to a config or .env
  databaseURL: "https://web-scrapper-364504-default-rtdb.firebaseio.com",
  storageBucket: "web-scrapper-364504.appspot.com",
});

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema: schemaWithMiddleware,
  context: async ({ req, res }) => ({ req, res }),
  introspection: true,
  playground: true,
});

// console.log(process.env.JWT_SECRET);

const scrapVowels = require("./crons");

server.listen(5000).then(({ url }) => {
  console.log(process.env.JWT_SECRET);
  console.log("Server ready at " + url);
});
