import { createContext, useContext, useState } from 'react';

export interface Adventure {
	id: string;
	name: string;
	description?: string;
	date?: string;
	image?: string;
	location?: any;
}

export const AdventuresContext = createContext({
	adventures: [],
	addAdventure: (adventure: Adventure) => {},
});

export const AdventuresProvider = ({ children }: { children: React.ReactNode }) => {
	const [adventures, setAdventures] = useState<Adventure[]>([]);

	const addAdventure = (adventure: Adventure) => {
		setAdventures([...adventures, adventure]);
	};

	return (
		<AdventuresContext.Provider value={{ adventures, addAdventure }}>
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
