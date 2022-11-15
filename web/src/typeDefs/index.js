const gql = require("graphql-tag");

const Query = require("./query");

const Mutation = require("./mutation");

const { types } = require("./types");

const genericTypeDefs = gql`
  scalar EmailAddress

  type CreateError {
    message: String!
  }
`;

const typeDefs = [Query, Mutation, genericTypeDefs, ...types];

module.exports = {
  typeDefs,
};
