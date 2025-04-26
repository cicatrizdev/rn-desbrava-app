import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { Reminder } from '../../context/reminders';
import { useAdventures } from '../../context/adventures';

const RemindersForm = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const { adventures } = useAdventures();
	const [reminderForm, setReminderForm] = useState<Reminder>({
		id: '',
		title: '',
		description: '',
		date: '',
	});
	const [checked, setChecked] = useState<'semana' | 'dia' | 'hora'>('semana');
	const handleInputChange = (key: keyof Reminder, value: string) => {
		setReminderForm({ ...reminderForm, [key]: value });
	};

	const handleAddReminder = () => {
		console.log(reminderForm);
	};

	return (
		<>
			<AppHeader title='Adicionar lembrete' icon='close' onPress={() => navigation.goBack()} />
			<ScrollView>
				<TextInput
					placeholder='Título do lembrete'
					value={reminderForm.title}
					onChangeText={(text) => handleInputChange('title', text)}
				/>
				<TextInput
					placeholder='Descrição do lembrete'
					value={reminderForm.description}
					onChangeText={(text) => handleInputChange('description', text)}
				/>
				<View>
					<Text>Selecione o evento:</Text>
					{adventures.map((adventure) => (
						<RadioButton
							key={adventure.id}
							value={`${adventure.title} ${adventure.date}`}
							status={checked === adventure.id ? 'checked' : 'unchecked'}
						/>
					))}
				</View>
				<View>
					<Text>Deseja notificar em qual momento?</Text>
					<RadioButton
						value='semana'
						status={checked === 'semana' ? 'checked' : 'unchecked'}
						onPress={() => setChecked('semana')}
					/>
					<RadioButton
						value='dia'
						status={checked === 'dia' ? 'checked' : 'unchecked'}
						onPress={() => setChecked('dia')}
					/>
					<RadioButton
						value='hora'
						status={checked === 'hora' ? 'checked' : 'unchecked'}
						onPress={() => setChecked('hora')}
					/>
				</View>
				<Button mode='contained' onPress={() => handleAddReminder()}>
					Adicionar o lembrete
				</Button>
			</ScrollView>
		</>
	);
};

export default RemindersForm;
