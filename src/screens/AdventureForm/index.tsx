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
					placeholder='XX/XX/XXXX'
					value={form.date}
					onChangeText={(text) => handleInputChange('date', text)}
					style={{ backgroundColor: colors.surface, marginTop: 16 }}
					mode='outlined'
					outlineColor={colors.outline}
					activeOutlineColor={colors.outline}
					textColor={colors.onSurface}
					right={<TextInput.Icon icon='calendar' />}
					keyboardType='email-address'
				/>
				<TextInput
					label='Descrição'
					placeholder='Descrição da aventura'
					value={form.description}
					onChangeText={(text) => handleInputChange('description', text)}
					style={{ backgroundColor: colors.surface, marginTop: 16 }}
					mode='outlined'
					outlineColor={colors.outline}
					activeOutlineColor={colors.outline}
					textColor={colors.onSurface}
					multiline
					numberOfLines={6}
				/>
				<TextInput
					label='Imagem'
					placeholder='Imagem'
					style={{ backgroundColor: colors.surface, marginTop: 16 }}
					mode='outlined'
					outlineColor={colors.outline}
					activeOutlineColor={colors.outline}
					textColor={colors.onSurface}
					right={<TextInput.Icon icon='image' />}
				/>
			</View>
		</>
	);
};

export default AdventureForm;
