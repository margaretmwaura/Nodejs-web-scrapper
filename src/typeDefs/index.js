const gql = require("graphql-tag");

const Query = require("./query");

const Mutation = require("./mutation");

const Subscription = require("./subscriptions");

const { types } = require("./types");

const genericTypeDefs = gql`
  scalar EmailAddress

  scalar Date

  scalar DateTime

  type CreateError {
    message: String!
  }
`;

const typeDefs = [Query, Mutation, Subscription, genericTypeDefs, ...types];

module.exports = {
  typeDefs,
};
