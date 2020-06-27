const { ApolloServer } = require("apollo-server");

let photos = [];

const typeDefs = `
  # 1. Add Photo type definition
    type Photo {
      id: ID!
      url: String!
      name: String!
      description: String
    }

  # 2. Return Photo from allPhotos
    type Query {
      totalPhotos: Int!
      allPhotos: [Photo!]!
    }

  # 3. Return the newly posted photo from the mutation
    type Mutation {
      postPhoto(name: String! description: String): Photo!
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
