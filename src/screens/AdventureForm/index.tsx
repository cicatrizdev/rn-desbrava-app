import { View, Text, Pressable, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { CameraView, useCameraPermissions } from 'expo-camera';

interface AdventureFormInputs {
	name: string;
	description?: string;
	date?: string;
	image?: string;
}

const AdventureForm = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const [permission, requestPermission] = useCameraPermissions();
	const [isCameraActive, setIsCameraActive] = useState(false);
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
			{isCameraActive ? (
				<>
					<AppHeader
						title='Adicionar imagem'
						icon='close'
						onPress={() => setIsCameraActive(false)}
					/>
					<CameraView style={{ flex: 1, width: '100%' }} mode='picture' />
					<View
						style={{
							position: 'absolute',
							bottom: 44,
							width: '100%',
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingHorizontal: 30,
						}}
					>
						<Pressable
							onPress={() => setIsCameraActive(false)}
							style={{
								backgroundColor: 'transparent',
								borderWidth: 5,
								borderColor: colors.primary,
								width: 80,
								height: 80,
								borderRadius: 45,
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 10,
							}}
						>
							<TextInput.Icon
								icon='camera'
								size={30}
								color={colors.primary}
								onPress={() => setIsCameraActive(false)}
							/>
						</Pressable>
					</View>
				</>
			) : (
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
						<Pressable
							style={{ width: '100%', height: 80, zIndex: 10 }}
							onPress={() => {
								if (!!permission && permission.status === 'denied') {
									return Alert.alert(
										'Permissão Necessária',
										'Para utilizar esse recurso, você precisa permitir o acesso à câmera no seu dispositivo',
										[
											{
												text: 'Cancelar',
												style: 'cancel',
											},
											{
												text: 'Abrir Configurações',
												onPress: () => Linking.openSettings(),
											},
										]
									);
								}
								return setIsCameraActive(true);
							}}
						>
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
			)}
		</>
	);
};

export default AdventureForm;
