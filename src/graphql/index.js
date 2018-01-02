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
import CURRENT_LOBBY_STATE_QUERY from './queries-mutations-subscriptions/current-lobby-state.graphql';
import CURRENT_GAME_STATE_QUERY from './queries-mutations-subscriptions/current-game-state.graphql';
import UPDATE_LAST_WILL from './queries-mutations-subscriptions/update-last-will.graphql';
import INTERACT from './queries-mutations-subscriptions/interact.graphql';
import CURRENT_MESSAGES from './queries-mutations-subscriptions/current-messages.graphql';
import MESSAGE_SUBSCRIPTION from './queries-mutations-subscriptions/message.graphql';
import ADD_PUBLIC_MESSAGE from './queries-mutations-subscriptions/add-public-message.graphql';
import ADD_DEAD_MESSAGE from './queries-mutations-subscriptions/add-dead-message.graphql';
import ADD_PRIVATE_MESSAGE from './queries-mutations-subscriptions/add-private-message.graphql';

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
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

export {
	Client,
	LOGIN_QUERY,
	REGISTER_MUTATION,
	JOIN_LOBBY_MUTATION,
	LEAVE_LOBBY_MUTATION,
	STATE_UPDATES_SUBSCRIPTION,
	CURRENT_LOBBY_STATE_QUERY,
	CURRENT_GAME_STATE_QUERY,
	UPDATE_LAST_WILL,
	INTERACT,
	CURRENT_MESSAGES,
	MESSAGE_SUBSCRIPTION,
	ADD_PUBLIC_MESSAGE,
	ADD_PRIVATE_MESSAGE,
	ADD_DEAD_MESSAGE,
};
