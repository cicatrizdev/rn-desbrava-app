import { createContext, useContext, useState } from 'react';

const presavedAdventures: Adventure[] = [
	{
		id: '1',
		name: 'Adventura 1',
		description: 'Lorem ipsum',
		date: '12/12/2025',
	},
	{
		id: '2',
		name: 'Adventura 2',
		description: 'Lorem ipsum',
		date: '12/12/2025',
	},
	{
		id: '3',
		name: 'Adventura 3',
		description: 'Lorem ipsum',
		date: '12/12/2025',
	},
];

export interface Adventure {
	id: string;
	name: string;
	description?: string;
	date?: string;
	image?: string;
	location?: {
		address: string;
		latitude: number;
		longitude: number;
	};
}

export const AdventuresContext = createContext({
	adventures: [],
	currentAdventure: null,
	setCurrentAdventure: (adventure: Adventure | null) => {},
	addAdventure: (adventure: Adventure) => {},
	editAdventure: (adventure: Adventure) => {},
});

export const AdventuresProvider = ({ children }: { children: React.ReactNode }) => {
	const [adventures, setAdventures] = useState<Adventure[]>(presavedAdventures);
	const [currentAdventure, setCurrentAdventure] = useState<Adventure | null>(null);

	const addAdventure = (adventure: Adventure) => {
		setAdventures([...adventures, adventure]);
	};

	const editAdventure = (adventure: Adventure) => {
		setAdventures(adventures.map((a) => (a.id === adventure.id ? adventure : a)));
	};

	return (
		<AdventuresContext.Provider
			value={{ adventures, addAdventure, currentAdventure, setCurrentAdventure, editAdventure }}
		>
			{children}
		</AdventuresContext.Provider>
	);
};

export const useAdventures = () => {
	const context = useContext(AdventuresContext);
	if (!context) {
		throw new Error('useAdventures must be used within an AdventuresProvider');
	}
	return context;
};
