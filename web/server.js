// We still have this require incase we need to use the values in the .env
require("dotenv").config({ path: "../.env" });

const { ApolloServer } = require("@apollo/server");
const gql = require("graphql-tag");
const fs = require("fs");
const { typeDefs } = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const { shield, rule, allow, deny, and } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("graphql-tools");
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
const admin = require("firebase-admin");
const serviceAccount = require("./config/fbServiceAccountKey.json");

global.admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  // FIXME: This should be moved to a config or .env
  databaseURL: "https://web-scrapper-364504-default-rtdb.firebaseio.com",
  storageBucket: "web-scrapper-364504.appspot.com",
});

const app = express();
// This `app` is the returned value from `express()`.
const httpServer = createServer(app);

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(executableSchema, ...middleware);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schemaWithMiddleware }, wsServer);

async function startApolloServer() {
  const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema: schemaWithMiddleware,
    context: async ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
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

  // console.log(process.env.JWT_SECRET);

  // const scrapVowels = require("./crons");

  // server.listen(5000).then(({ url }) => {
  //   console.log(process.env.JWT_SECRET);
  //   console.log("Server ready at " + url);
  // });
  await server.start();

  app.use("/graphql", cors, bodyParser.json(), expressMiddleware(server));

  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen("5000", () => {
    console.log(`Server is now running on http://localhost:${5000}/graphql`);
  });
}
startApolloServer();
