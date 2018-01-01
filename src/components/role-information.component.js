import React from 'react';

const ROLE_INFORMATIONS = {
	Sheriff: {
		summary: 'The law enforcer of the Town, forced into hiding from threat of murder.',
		abilities: 'Interrogate one person each night for suspicious activity.',
		attributes: [
			'You will know if your target is a member of the Mafia.',
			'You will know if your target is a Serial Killer.',
		],
		goal: 'Lynch every criminal and evildoer.',
	},
	Doctor: {
		summary: 'A surgeon skilled in trauma care who secretly heals people.',
		abilities: 'Heal one person each night, preventing them from dying.',
		attributes: [
			'Healing will give your target a Basic Defense for 1 night.',
		],
		goal: 'Lynch every criminal and evildoer.',
	},
	Jailor: {
		summary: 'A prison guard who secretly detains suspects.',
		abilities: 'You may choose one person during the day to jail for the night.',
		attributes: [
			'The jailed target can\'t perform their night ability.',
			'While jailed the prisoner is given Powerful defense.',
		],
		goal: 'Lynch every criminal and evildoer.',
	},
	Escort: {
		summary: 'A beautiful woman skilled in distraction.',
		abilities: 'Distract someone each night.',
		attributes: [
			'Distraction blocks your target from using their role\'s night ability.',
		],
		goal: 'Lynch every criminal and evildoer.',
	},
	Investigator: {
		summary: 'A private eye who secretly gathers information.',
		abilities: 'Investigate one person each night for a clue to their role.',
		attributes: [],
		goal: 'Lynch every criminal and evildoer.',
	},
	Medium: {
		summary: 'A secret Psychic who talks with the dead.',
		abilities: 'When dead speak to a living person at night.',
		attributes: [
			'You will speak to the dead anonymously each night you are alive.',
		],
		goal: 'Lynch every criminal and evildoer.',
	},
	Spy: {
		summary: 'A talented watcher who keeps track of evil in the Town.',
		abilities: 'You can track Mafia actions at night',
		attributes: [],
		goal: 'Lynch every criminal and evildoer.',
	},
	Vigilante: {
		summary: 'A militant officer willing to bend the law to enact justice.',
		abilities: 'Choose to take justice into your own hands and shoot someone.',
		attributes: [
			'If you shoot another Town member you will commit suicide over the guilt.',
		],
		goal: 'Lynch every criminal and evildoer.',
	},
	Blackmailer: {
		summary: 'An eavesdropper who uses information to keep people quiet.',
		abilities: 'Choose one person at day to blackmail him at night.',
		attributes: [
			'Blackmailed targets can not talk during the night.',
		],
		goal: 'Kill anyone who doesn\'t submit to Mafia.',
	},
	Framer: {
		summary: 'A skilled counterfeiter who manipulates information.',
		abilities: 'Choose someone at day to frame him at night.',
		attributes: [
			'If your target is investigated they will appear to be a member of the Mafia.',
		],
		goal: 'Kill anyone who doesn\'t submit to Mafia.',
	},
	Godfather: {
		summary: 'The leader of organized crime.',
		abilities: 'You may choose to attack a player each night.',
		attributes: [
			'You will appear to be a Town member to the Sheriff.',
			'You have Basic Defense',
			'You have Basic Attack',
		],
		goal: 'Kill anyone who doesn\'t submit to Mafia.',
	},
	Mafioso: {
		summary: 'A member of organized crime, trying to work their way to the top.',
		abilities: 'You may choose to attack a player each night.',
		attributes: ['You have Basic Attack'],
		goal: 'Kill anyone who doesn\'t submit to Mafia.',
	},
	Executioner: {
		summary: 'An obsessed lyncher who will stop at nothing to execute his target.',
		abilities: 'Trick the Town into lynching your target.',
		attributes: [],
		goal: 'Get your target lynched at any cost.',
	},
	Jester: {
		summary: 'A crazed lunatic whose life goal is to be publicly executed.',
		abilities: 'Trick the Town into voting against you.',
		attributes: ['If you are lynched, a random voter will dead'],
		goal: 'Get yourself lynched by any means necessary.',
	},
	'Serial Killer': {
		summary: 'A psychotic criminal who wants everyone to die.',
		abilities: 'You may choose to attack a player each night.',
		attributes: ['You have Basic Attack', 'You have Basic Defense'],
		goal: 'Kill everyone who would oppose you.',
	},
};

const RoleInformation = props => (
	<div>
		<div>
			<div><b>Summary:</b></div>
			{ROLE_INFORMATIONS[props.role].summary}
		</div>
		<div>
			<div><b>Abilities:</b></div>
			{ROLE_INFORMATIONS[props.role].abilities}
		</div>
		<div>
			<div><b>Attributes:</b></div>
			{ROLE_INFORMATIONS[props.role].attributes.map(attr => <div key={attr}>{attr}</div>)}
		</div>
	</div>
);

export default RoleInformation;
