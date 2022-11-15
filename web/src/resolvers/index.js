const { Query } = require("./queries");
const { Mutation } = require("./mutations");
const { GraphQLScalarType, GraphQLError, Kind } = require("graphql");

const EMAIL_ADDRESS_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validate = (value) => {
  console.log(value);
  if (typeof value !== "string") {
    throw new GraphQLError("Value is not a String");
  }

  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    throw new GraphQLError("The value is not a valid Email Address");
  }

  return value;
};

const parseLiteral = (ast) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(
      "Query Error : Can only parse strings as Email Address"
    );
  }

  return validate(ast.value);
};

const GraphQLEmailAdressConfig = {
  name: "EmailAddress",
  description: "A valid Email Address",
  serialize: validate,
  parseValue: (value) => value,
  parseLiteral,
};

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
