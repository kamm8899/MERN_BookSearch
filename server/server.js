const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require("./schemas");
const routes = require('./routes');

const startServer = async () => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

    // Start the Apollo server
    await server.start();
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  };


// Initialize the Apollo server
startServer();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});