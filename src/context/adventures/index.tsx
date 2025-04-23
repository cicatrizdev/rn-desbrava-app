import { createContext, useContext, useState } from 'react';

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
	const [adventures, setAdventures] = useState<Adventure[]>([]);
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
