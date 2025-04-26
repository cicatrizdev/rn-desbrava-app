import React from 'react';
import { Text } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';

const RemindersForm = () => {
	const navigation = useNavigation<RootStackNavigationProp>();

	return (
		<>
			<AppHeader title='Adicionar lembrete' icon='close' onPress={() => navigation.goBack()} />
			<Text>RemindersForm</Text>
		</>
	);
};

export default RemindersForm;
