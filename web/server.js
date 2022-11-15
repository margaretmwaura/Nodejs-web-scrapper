const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const fs = require("fs");
const { typeDefs } = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const { shield, rule, allow, deny, and } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("graphql-tools");

require("dotenv").config();

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context, _info) => {
    const result = !!context.user;
    console.info(`isAuthenticated:${result}`);
    return result;
  }
);

// FIXME: This works , learn how I can make this a global file
const permisions = shield({
  Mutation: {
    // registerUser: isAuthenticated,
  },
});

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permisions
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schema,
  // FIXME:
  // Have a util for the checking if a user is authorized
  context: ({ req }) => ({ ...req }),
  introspection: true,
  playground: true,
});

// const scrapVowels = require("./crons");

server.listen(5000).then(({ url }) => {
  console.log(process.env.JWT_SECRET);
  console.log("Server ready at " + url);
});
