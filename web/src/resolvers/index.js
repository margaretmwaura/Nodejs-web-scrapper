const { Query } = require("./queries");
const { Mutation } = require("./mutations");
const { GraphQLScalarType } = require("graphql");
const { GraphQLDateTime, GraphQLDate } = require("graphql-iso-date");
const GraphQLEmailAdressConfig = require("./emailAdressConfig");
const { TodoList } = require("./../../models");
const { pubsub } = require("./../pubSub");
const { withFilter } = require("graphql-subscriptions");
const moment = require("moment");

console.log("Import");
console.log(GraphQLEmailAdressConfig);
const GraphQLEmailAddress = new GraphQLScalarType(GraphQLEmailAdressConfig);

module.exports = {
  Query,

  Mutation,

  // FIXME: This should move to its own file
  Subscription: {
    todoCreated: {
      // More on pubsub below
      subscribe: withFilter(
        () => pubsub.asyncIterator(["TODO_CREATED"]),
        (payload, variables) => {
          const TODAY_START = moment().format("YYYY-MM-DD 00:00");
          const TODAY_END = moment().format("YYYY-MM-DD 23:59");

          let utcDate = moment.utc(payload.todoCreated.createdAt).format();

          let localTime = moment
            .utc(utcDate)
            .local()
            .format("YYYY-MM-DD HH:mm");

          return localTime >= TODAY_START && localTime <= TODAY_END;
        }
      ),
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
