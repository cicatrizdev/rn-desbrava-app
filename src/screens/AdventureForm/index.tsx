import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { useCameraPermissions } from 'expo-camera';

interface AdventureFormInputs {
	name: string;
	description?: string;
	date?: string;
	image?: string;
}

const AdventureForm = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const [permission, requestPermission] = useCameraPermissions();
	const [form, setForm] = useState<AdventureFormInputs>({
		name: '',
		description: '',
		date: '',
		image: '',
	});

	const handleInputChange = (key: keyof AdventureFormInputs, value: string) => {
		setForm({ ...form, [key]: value });
	};

	useEffect(() => {
		if (!!permission && !permission.granted) {
			requestPermission();
		}
	}, [permission]);

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
				<Pressable>
					<TextInput
						label='Adicionar uma imagem'
						placeholder='Adicionar uma imagem'
						style={{ backgroundColor: colors.surface, marginTop: 16 }}
						mode='outlined'
						outlineColor={colors.outline}
						activeOutlineColor={colors.outline}
						textColor={colors.onSurface}
						right={<TextInput.Icon icon='upload' />}
						readOnly
					/>
				</Pressable>
				<View
					style={{
						marginTop: 16,
						justifyContent: 'flex-end',
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<Button
						mode='contained'
						onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Adventures' }] })}
						style={{ backgroundColor: colors.primary }}
						textColor={colors.black}
					>
						Adicionar
					</Button>
				</View>
			</View>
		</>
	);
};

export default AdventureForm;
