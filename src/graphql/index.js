/*
3rd Party library imports
 */
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
/*
Project file imports
 */
import LOGIN_QUERY from './login.graphql';
import REGISTER_MUTATION from './register.graphql';

const Client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

export {
  Client,
  LOGIN_QUERY,
  REGISTER_MUTATION,
};
