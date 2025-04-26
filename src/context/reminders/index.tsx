import { createContext, useContext, useState } from 'react';
import notifee, { Trigger, TriggerType } from '@notifee/react-native';

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

	const addReminder = async (reminder: Reminder) => {
		await notifee.requestPermission();
		await notifee.createChannel({
			id: 'lembretes',
			name: 'Lembretes de Aventuras',
		});

		const date = reminder.date && reminder.date.split('/');

		const trigger = new Date(
			Number(date[2]),
			Number(date[1]) - 1,
			Number(date[0])
		).getMilliseconds();

		await notifee.createTriggerNotification(
			{
				id: reminder.id,
				title: reminder.title,
				subtitle: reminder.subtitle,
				body: reminder.description,
			},
			{
				type: TriggerType.TIMESTAMP,
				timestamp: trigger,
			}
		);

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
