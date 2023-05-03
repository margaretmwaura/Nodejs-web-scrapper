const { Query } = require("./queries");
const { Mutation } = require("./mutations");
const { GraphQLScalarType } = require("graphql");
const { GraphQLDateTime, GraphQLDate } = require("graphql-iso-date");
const GraphQLEmailAdressConfig = require("./emailAdressConfig");

console.log("Import");
console.log(GraphQLEmailAdressConfig);
const GraphQLEmailAddress = new GraphQLScalarType(GraphQLEmailAdressConfig);

module.exports = {
  Query,

  Mutation,

  EmailAddress: GraphQLEmailAddress,

  Date: GraphQLDate,

  DateTime: GraphQLDateTime,

  userRegister: {
    __resolveType(obj) {
      if (obj.message) {
        return "CreateError";
      }

      if (obj.id) {
        return "RegisterSuccessful";
      }

      return obj.__typename;
    },
  },
};
