const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const resolvers = require("./graphql/resolvers.js");
const fs = require("fs");
const typeDefs = gql(
  fs.readFileSync("./graphql/typeDefs.graphql", { encoding: "utf-8" })
);

const server = new ApolloServer({ typeDefs, resolvers });

const scrapVowels = require("./crons/scrapVowels");
server.listen(5001).then(({ url }) => {
  console.log("Server ready at " + url);
});
