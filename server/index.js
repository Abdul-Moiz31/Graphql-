const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const cors = require('cors');
const { default: axios } = require('axios');

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    resolvers: {
      Todo: {
        user: async (todo) => {
          return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`, { timeout: 10000 })).data;
        },
      },
      Query: {
        getTodos: async () => {
          return (await axios.get("https://jsonplaceholder.typicode.com/todos", { timeout: 10000 })).data;
        },
        getAllUsers: async () => {
          return (await axios.get("https://jsonplaceholder.typicode.com/users", { timeout: 10000 })).data;
        },
        getUser: async (parent, { id }) => {
          return (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, { timeout: 10000 })).data;
        },
      },
    },
    typeDefs: `
      type User {
        id: ID
        name: String
        username: String
        email: String
        phone: String
        website: String
      }
      type Todo {
        id: ID
        title: String
        completed: Boolean
        user: User
      }
      type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User
      }
    `,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(9000, () =>
    console.log("Server is started at port 9000")
  );
}

startServer();
