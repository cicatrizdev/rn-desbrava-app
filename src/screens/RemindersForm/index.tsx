import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { TextInput } from 'react-native-paper';

const RemindersForm = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const [reminderForm, setReminderForm] = useState<>();

	return (
		<>
			<AppHeader title='Adicionar lembrete' icon='close' onPress={() => navigation.goBack()} />
			<ScrollView>
				<TextInput
					placeholder='Título'
					value={reminderForm.title}
					onChangeText={(text) => setTitle(text)}
				/>
			</ScrollView>
		</>
	);
};

export default RemindersForm;
