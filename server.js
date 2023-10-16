// We still have this require incase we need to use the values in the .env
require("dotenv").config({ path: "../.env" });
const { ApolloServer } = require("@apollo/server");
const gql = require("graphql-tag");
const fs = require("fs");
const { typeDefs } = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const { shield, rule, allow, deny, and } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const middleware = require("./src/middleware");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const moment = require("moment");

// This `app` is the returned value from `express()`.
const app = express();
const httpServer = createServer(app);

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

// FIXME: Use of MiddleWare first put aside for t-shoot
const schemaWithMiddleware = applyMiddleware(executableSchema, ...middleware);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema: schemaWithMiddleware }, wsServer);

async function startApolloServer(schemaWithMiddleware, httpServer, app) {
  const server = new ApolloServer({
    schema: schemaWithMiddleware,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  require("./crons");

  await server.start();

  // The cors is meant to be a function please , if not the server will not be reachable and no error will be thrown
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
      }),
    })
  );

  // Now that our HTTP server is fully set up, we can listen to it.
  console.log(process.env.JWT_SECRET);
  console.log(process.env.ENCRYPTION_KEY);
  const PORT = process.env.PORT;
  console.log(PORT);
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer(schemaWithMiddleware, httpServer, app);
