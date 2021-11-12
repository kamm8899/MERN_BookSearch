const express = require('express');
//import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const path = require('path');
const db = require('./config/connection');
//import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require('./utils/auth');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

      // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

//file is updated