import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  type Query {
    Users: [User]
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    email: String
  }
`;

const resolvers = {
  Query: {
    Users : () =>  {
      return [{ id: '1', name: 'ava', email: "ava@gmail.com" }];
    },
  },

  User: {
    __resolveReference : (ref) =>  {
      console.log("user __resolveReference");
      console.log(ref);
      return { id: '1', name: 'ava', email: "ava@gmail.com" };
    },
  },

};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
  listen: {port: 4002}
});
console.log(`🚀  Server ready at ${url}`);



