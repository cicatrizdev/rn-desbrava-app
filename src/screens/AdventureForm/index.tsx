import { View, Text, Pressable, Alert, Linking, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { Adventure, useAdventures } from '../../context/adventures';

const AdventureForm = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const [isCameraActive, setIsCameraActive] = useState(false);
	const { addAdventure } = useAdventures();
	const [form, setForm] = useState<Adventure>({
		id: '',
		name: '',
		description: '',
		date: '',
		image: '',
	});

	const handleInputChange = (key: keyof Adventure, value: string) => {
		setForm({ ...form, [key]: value });
	};

	const handleTakePicture = async () => {
		const photo = await cameraRef.current?.takePictureAsync();
		setForm({ ...form, image: photo?.uri });
		setIsCameraActive(false);
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
					<CameraView style={{ flex: 1, width: '100%' }} mode='picture' ref={cameraRef} />
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
							onPress={handleTakePicture}
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
								onPress={handleTakePicture}
							/>
						</Pressable>
					</View>
				</>
			) : (
				<>
					<AppHeader title='Adicionar aventura' showBackButton />
					<ScrollView style={{ marginHorizontal: 16, marginTop: 16 }}>
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
						{!!form.image && form.image.length > 0 ? (
							<Image
								source={{ uri: form.image }}
								style={{
									width: '100%',
									marginTop: 16,
									aspectRatio: 1,
									borderWidth: 1,
									borderColor: colors.outline,
								}}
								contentFit='contain'
							/>
						) : (
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
						)}
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
					</ScrollView>
				</>
			)}
		</>
	);
};

export default AdventureForm;
