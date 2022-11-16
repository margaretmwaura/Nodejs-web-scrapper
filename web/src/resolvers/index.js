const { Query } = require("./queries");
const { Mutation } = require("./mutations");
const { GraphQLScalarType } = require("graphql");
const GraphQLEmailAdressConfig = require("./emailAdressConfig");

console.log("Import");
console.log(GraphQLEmailAdressConfig);
const GraphQLEmailAddress = new GraphQLScalarType(GraphQLEmailAdressConfig);

module.exports = {
  Query,

  Mutation,

  EmailAddress: GraphQLEmailAddress,

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
