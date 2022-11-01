const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const fs = require("fs");
const { typeDefs } = require("./src/typeDefs");
const resolvers = require("./src/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

const scrapVowels = require("./crons");

server.listen(5001).then(({ url }) => {
  console.log("Server ready at " + url);
});
