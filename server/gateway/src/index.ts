import { ApolloGateway, IntrospectAndCompose }  from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'user-service', url: 'http://localhost:4001' },
      { name: 'post-service', url: 'http://localhost:4002' },
      // ...additional subgraphs...
    ],
  }),
});



const server = new ApolloServer({
  gateway,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Gateway ready at ${url}`);