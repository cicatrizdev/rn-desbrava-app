import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { TextInput } from 'react-native-paper';

interface AdventureFormInputs {
	name: string;
	description?: string;
	date?: string;
	image?: string;
}

const AdventureForm = () => {
	const [form, setForm] = useState<AdventureFormInputs>({
		name: '',
		description: '',
		date: '',
		image: '',
	});

	const handleInputChange = (key: keyof AdventureFormInputs, value: string) => {
		setForm({ ...form, [key]: value });
	};

	return (
		<>
			<AppHeader title='Adicionar aventura' showBackButton />
			<View style={{ marginHorizontal: 16, marginTop: 16 }}>
				<TextInput
					label='Nome'
					placeholder='Nome da aventura'
					value={form.name}
					onChangeText={(text) => handleInputChange('name', text)}
					style={{ backgroundColor: colors.surface }}
					mode='outlined'
					outlineColor={colors.outline}
					activeOutlineColor={colors.outline}
					textColor={colors.onSurface}
				/>
				<TextInput
					label='Data'
					placeholder='Data da aventura'
					value={form.date}
					onChangeText={(text) => handleInputChange('date', text)}
					style={{ backgroundColor: colors.surface }}
					mode='outlined'
					outlineColor={colors.outline}
					activeOutlineColor={colors.outline}
					textColor={colors.onSurface}
				/>
			</View>
		</>
	);
};

export default AdventureForm;
