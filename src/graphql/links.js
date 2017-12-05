import { ApolloLink, HttpLink } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
	/*
  onError receives a callback in the event a GraphQL or network error occurs.
  This example is a bit contrived, but in the real world, you could connect
  a logging service to the errorLink or perform a specific action in response
  to an error.
  */
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
		/*
    You can use a simple middleware link like this one to set credentials,
    headers, or whatever else you need on the context.
    All links in the chain will have access to the context.
    */
		operation.setContext({
			credentials: 'same-origin',
		});

		return forward(operation);
	}).concat(new HttpLink({
		uri: '/graphql',
		...config,
	}));

export const requestLink = ({ queryOrMutation, subscription }) =>
	/*
    This link checks if the operation is a subscription.
    If it is, we use our subscription link to retrieve data over WebSockets.
    If it is a query or mutation, we retrieve data over HTTP.
  */
	ApolloLink.split(
		({ query }) => {
			const { kind, operation } = getMainDefinition(query);
			return kind === 'OperationDefinition' && operation === 'subscription';
		},
		subscription,
		queryOrMutation,
	);
