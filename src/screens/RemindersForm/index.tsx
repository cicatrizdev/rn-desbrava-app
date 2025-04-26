import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { Reminder } from '../../context/reminders';
import { useAdventures } from '../../context/adventures';
import { colors } from '../../styles/colors';

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
	const [selectedAdventure, setSelectedAdventure] = useState<string | null>(null);
	const handleInputChange = (key: keyof Reminder, value: string) => {
		setReminderForm({ ...reminderForm, [key]: value });
	};

	const handleAddReminder = () => {
		console.log(reminderForm);
	};

	return (
		<>
			<AppHeader title='Adicionar lembrete' icon='close' onPress={() => navigation.goBack()} />
			<ScrollView style={{ marginHorizontal: 16, marginTop: 16 }}>
				<TextInput
					placeholder='Título do lembrete'
					label='Título do lembrete'
					value={reminderForm.title}
					onChangeText={(text) => handleInputChange('title', text)}
					mode='outlined'
					outlineColor={colors.outline}
					activeOutlineColor={colors.outline}
					textColor={colors.onSurface}
					style={{ backgroundColor: colors.surface, marginTop: 16 }}
				/>
				<TextInput
					placeholder='Descrição do lembrete'
					label='Descrição do lembrete'
					value={reminderForm.description}
					onChangeText={(text) => handleInputChange('description', text)}
					style={{ backgroundColor: colors.surface, marginTop: 16 }}
					mode='outlined'
					outlineColor={colors.outline}
					activeOutlineColor={colors.outline}
					textColor={colors.onSurface}
				/>
				<RadioButton.Group
					onValueChange={(value) => setSelectedAdventure(value)}
					value={selectedAdventure}
				>
					<Text style={{ marginBottom: 16, marginTop: 16, color: colors.onSurface }}>
						Selecione o evento:
					</Text>
					{adventures.map((adventure) => (
						<RadioButton.Item
							key={adventure.id}
							label={`${adventure.name} ${adventure.date}`}
							value={adventure.id}
							status={selectedAdventure === adventure.id ? 'checked' : 'unchecked'}
							labelStyle={{ color: colors.onSurface }}
						/>
					))}
				</RadioButton.Group>
				<RadioButton.Group
					onValueChange={(value) => setChecked(value as 'semana' | 'dia' | 'hora')}
					value={checked}
				>
					<Text style={{ marginBottom: 16, marginTop: 16, color: colors.onSurface }}>
						Deseja notificar em qual momento?
					</Text>
					<RadioButton.Item
						label='Semana da aventura'
						value='semana'
						status={checked === 'semana' ? 'checked' : 'unchecked'}
						onPress={() => setChecked('semana')}
						color={colors.primary}
						labelStyle={{ color: colors.onSurface }}
					/>
					<RadioButton.Item
						label='Dia anterior a aventura'
						value='dia'
						status={checked === 'dia' ? 'checked' : 'unchecked'}
						onPress={() => setChecked('dia')}
						color={colors.primary}
						labelStyle={{ color: colors.onSurface }}
					/>
					<RadioButton.Item
						label='1 hora antes da aventura'
						value='hora'
						status={checked === 'hora' ? 'checked' : 'unchecked'}
						onPress={() => setChecked('hora')}
						color={colors.primary}
						labelStyle={{ color: colors.onSurface }}
					/>
				</RadioButton.Group>
				<Button mode='contained' onPress={() => handleAddReminder()}>
					Adicionar o lembrete
				</Button>
			</ScrollView>
		</>
	);
};

export default RemindersForm;
