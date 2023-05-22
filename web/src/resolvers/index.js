const { Query } = require("./queries");
const { Mutation } = require("./mutations");
const { GraphQLScalarType } = require("graphql");
const { GraphQLDateTime, GraphQLDate } = require("graphql-iso-date");
const GraphQLEmailAdressConfig = require("./emailAdressConfig");
const { TodoList } = require("./../../models");
const { pubsub } = require("./../pubSub");

console.log("Import");
console.log(GraphQLEmailAdressConfig);
const GraphQLEmailAddress = new GraphQLScalarType(GraphQLEmailAdressConfig);

module.exports = {
  Query,

  Mutation,

  Subscription: {
    todoCreated: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["TODO_CREATED"]),
    },
  },

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

  TodoList: {
    todoListItems(todoList) {
      return todoList.getTodoListItems();
    },
  },
};
