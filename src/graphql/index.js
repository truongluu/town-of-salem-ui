/*
3rd Party library imports
 */
import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-client-preset';
/*
Project file imports
 */
import LOGIN_QUERY from './queries-mutations-subscriptions/login.graphql';
import REGISTER_MUTATION from './queries-mutations-subscriptions/register.graphql';
import JOIN_LOBBY_MUTATION from './queries-mutations-subscriptions/join-lobby.graphql';
import LEAVE_LOBBY_MUTATION from './queries-mutations-subscriptions/leave-lobby.graphql';
import STATE_UPDATES_SUBSCRIPTION from './queries-mutations-subscriptions/state-updates.graphql';
import CURRENT_STATE_QUERY from './queries-mutations-subscriptions/current-state.graphql';

import { errorLink, queryOrMutationLink, requestLink, subscriptionLink } from './links';

const Client = new ApolloClient({
	ssrMode: true,
	link: ApolloLink.from([
		errorLink,
		requestLink({
			queryOrMutation: queryOrMutationLink(),
			subscription: subscriptionLink(),
		}),
	]),
	cache: new InMemoryCache(),
});

export {
	Client,
	LOGIN_QUERY,
	REGISTER_MUTATION,
	JOIN_LOBBY_MUTATION,
	LEAVE_LOBBY_MUTATION,
	STATE_UPDATES_SUBSCRIPTION,
	CURRENT_STATE_QUERY,
};
