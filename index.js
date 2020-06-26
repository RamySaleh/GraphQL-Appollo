const { ApolloServer } = require("apollo-server");

let photos = [];

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`;

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
  },
  Mutation: {
    postPhoto(parent, args) {
      photos.push(args);
      console.log(args);
      return true;
    },
  },
};

// 2. Create a new instance of the server.
// 3. Send it an object with typeDefs (the schema) and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. Call listen on the server to launch the web server
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
