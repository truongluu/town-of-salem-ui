import { ApolloLink, HttpLink } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
	}
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const subscriptionLink = (config = {}) =>
	new WebSocketLink({
		uri: 'ws://localhost:3000/graphql',
		options: { reconnect: true },
		...config,
	});


export const queryOrMutationLink = (config = {}) =>
	new ApolloLink((operation, forward) => {
		operation.setContext({
			credentials: 'same-origin',
		});

		return forward(operation);
	}).concat(new HttpLink({
		uri: 'http://localhost:3000/graphql',
		...config,
	}));

export const requestLink = ({ queryOrMutation, subscription }) =>
	ApolloLink.split(
		({ query }) => {
			const { kind, operation } = getMainDefinition(query);
			return kind === 'OperationDefinition' && operation === 'subscription';
		},
		subscription,
		queryOrMutation,
	);
