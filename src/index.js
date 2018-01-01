/*
3rd Party library imports
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
/*
Project file imports
 */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Root from './containers/root.container';
import configureStore from './redux/store/index';
import registerServiceWorker from './registerServiceWorker';
import { Client } from './graphql';

const store = configureStore();

ReactDOM.render(
	<ApolloProvider client={Client}>
		<Root store={store} />
	</ApolloProvider>,
	document.getElementById('root'),
);
registerServiceWorker();
