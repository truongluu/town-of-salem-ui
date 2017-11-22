/*
3rd Party library imports
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
/*
Project file imports
 */
import './index.css';
import Root from './containers/Root/root.container';
import configureStore from './store/index';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root store={store} />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
