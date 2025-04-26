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

export const RemindersProvider = ({ children }: { children: React.ReactNode }) => {
	const [reminders, setReminders] = useState<Reminder[]>([]);

	const addReminder = (reminder: Reminder) => {
		setReminders([...reminders, reminder]);
	};

	const editReminder = (reminder: Reminder) => {
		setReminders(reminders.map((r) => (r.id === reminder.id ? reminder : r)));
	};

	const deleteReminder = (id: string) => {
		setReminders(reminders.filter((r) => r.id !== id));
	};

	return (
		<RemindersContext.Provider value={{ reminders, addReminder, editReminder, deleteReminder }}>
			{children}
		</RemindersContext.Provider>
	);
};

export const useReminders = () => {
	const context = useContext(RemindersContext);
	if (!context) {
		throw new Error('useReminders must be used within a RemindersProvider');
	}
	return context;
};
