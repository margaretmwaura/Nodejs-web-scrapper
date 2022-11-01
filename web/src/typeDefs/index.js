const gql = require("graphql-tag");

const Query = require("./query");

const Mutation = require("./mutation");

const { types } = require("./types");

const typeDefs = [Query, Mutation, ...types];

module.exports = {
  typeDefs,
};
