import { View, Text } from 'react-native';
import React from 'react';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';

const AdventureForm = () => {
	return (
		<>
			<AppHeader title='Adicionar aventura' showBackButton />
			<View>
				<Text style={{ color: colors.onSurface }}>Adicionar aventura</Text>
			</View>
		</>
	);
};

export default AdventureForm;
