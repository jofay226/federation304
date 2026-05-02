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
    Posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    authorId: ID!
    author: User!
  }

  type User @key(fields: "id") {
    id: ID!
  }
`;

const resolvers = {
  Query: {
    Posts: () =>  {
      return [{ id: '1', title: '@ava', description: 'hfdskjfjdsk', authorId: "67"}];
    },
  },

  Post: {
    author: (parent: any) => {
      console.log('post resolver');
      console.log(parent);
      return {__typename: "User", id: parent.authorId}
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
  listen: {port: 4001}
});

console.log(`🚀  Server ready at ${url}`);