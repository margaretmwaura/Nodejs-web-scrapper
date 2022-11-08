const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const fs = require("fs");
const { typeDefs } = require("./src/typeDefs");
const resolvers = require("./src/resolvers");

require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,

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
