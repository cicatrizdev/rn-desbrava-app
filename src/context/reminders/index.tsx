import { createContext, useContext, useState } from 'react';

export interface Reminder {
	id: string;
	title: string;
	description: string;
	subtitle?: string;
	date?: string;
}

export const RemindersContext = createContext({
	reminders: [],
	addReminder: (reminder: Reminder) => {},
	editReminder: (reminder: Reminder) => {},
	deleteReminder: (id: string) => {},
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
