import { View, Text, Pressable, Alert, Linking, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { Adventure, useAdventures } from '../../context/adventures';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

const AdventureForm = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const [isCameraActive, setIsCameraActive] = useState(false);
	const [isMapViewActive, setIsMapViewActive] = useState(false);
	const { adventures, addAdventure } = useAdventures();
	const [form, setForm] = useState<Adventure>({
		id: '',
		name: '',
		description: '',
		date: '',
		image: '',
		location: null,
	});

	const [region, setRegion] = useState<Region>({
		latitude: -23.55052,
		longitude: -46.633308,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [selectedLocation, setSelectedLocation] = useState<{
		latitude: number;
		longitude: number;
		address: string;
	} | null>(null);

	const searchLocation = async (query: string) => {
		try {
			const response = await Location.geocodeAsync(query);
			if (response.length > 0) {
				const { latitude, longitude } = response[0];
				setRegion({
					...region,
					latitude,
					longitude,
				});
				const address = await Location.reverseGeocodeAsync({ latitude, longitude });
				if (address.length > 0) {
					const locationName = `${address[0].street}, ${address[0].city}, ${address[0].region}`;
					setSelectedLocation({
						latitude,
						longitude,
						address: locationName,
					});
					setForm({ ...form, location: locationName });
				}
			}
		} catch (error) {
			console.error('Error searching location:', error);
			Alert.alert('Erro', 'Não foi possível encontrar a localização');
		}
	};

	const handleInputChange = (key: keyof Adventure, value: string) => {
		setForm({ ...form, [key]: value });
	};

	const handleTakePicture = async () => {
		const photo = await cameraRef.current?.takePictureAsync();
		setForm({ ...form, image: photo?.uri });
		setIsCameraActive(false);
	};

	const handleAddAdventure = () => {
		addAdventure({ ...form, id: (adventures.length + 1).toString() });
		navigation.reset({ index: 0, routes: [{ name: 'Adventures' }] });
	};

	useEffect(() => {
		if (!!permission && !permission.granted) {
			requestPermission();
		}
	}, [permission]);

	const handleAddImage = () => {
		if (!!permission && permission.status === 'denied') {
			return Alert.alert(
				'Permissão Necessária',
				'Para utilizar esse recurso, você precisa permitir o acesso à câmera no seu dispositivo',
				[
					{ text: 'Cancelar', style: 'cancel' },
					{ text: 'Abrir Configurações', onPress: () => Linking.openSettings() },
				]
			);
		}
		return setIsCameraActive(true);
	};

	const handleAddLocation = () => {
		console.log('handleAddLocation');
	};

	const CameraComponent = () => (
		<>
			<AppHeader
				title={form.id ? 'Alterar imagem' : 'Adicionar imagem'}
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
	);

	const MapComponent = () => (
		<>
			<AppHeader title={'Localização'} icon='close' onPress={() => setIsMapViewActive(false)} />
			<MapView
				style={{ flex: 1, width: '100%' }}
				region={region}
				onRegionChangeComplete={setRegion}
				onDoublePress={(event) => {
					const { latitude, longitude } = event.nativeEvent.coordinate;
					setRegion({
						...region,
						latitude,
						longitude,
					});
					searchLocation(`${latitude}, ${longitude}`);
				}}
			>
				{selectedLocation && (
					<Marker
						coordinate={{
							latitude: selectedLocation.latitude,
							longitude: selectedLocation.longitude,
						}}
						title={selectedLocation.address}
					/>
				)}
			</MapView>
			<View
				style={{
					position: 'absolute',
					top: 120,
					width: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingHorizontal: 60,
				}}
			>
				<TextInput
					label='Pesquisar'
					style={{ backgroundColor: colors.surface, marginTop: 16, width: '100%' }}
					textColor={colors.onSurface}
					right={<TextInput.Icon icon='magnify' />}
					onSubmitEditing={(event) => searchLocation(event.nativeEvent.text)}
				/>
			</View>
		</>
	);

	if (isCameraActive) {
		return <CameraComponent />;
	}

	if (isMapViewActive) {
		return <MapComponent />;
	}

	return (
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
					multiline
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
				<TouchableOpacity
					onPress={() => setIsMapViewActive(true)}
					style={{ height: 80, zIndex: 10 }}
				>
					<TextInput
						label='Localização'
						placeholder='Adicionar uma localização'
						value={form.location}
						style={{ backgroundColor: colors.surface, marginTop: 16 }}
						mode='outlined'
						multiline
						outlineColor={colors.outline}
						activeOutlineColor={colors.outline}
						textColor={colors.onSurface}
						right={<TextInput.Icon icon='map-marker' />}
						readOnly
						onPress={() => setIsMapViewActive(true)}
					/>
				</TouchableOpacity>
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
					<TouchableOpacity onPress={handleAddImage} style={{ height: 80, zIndex: 10 }}>
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
							onPress={handleAddImage}
						/>
					</TouchableOpacity>
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
						onPress={handleAddAdventure}
						style={{ backgroundColor: colors.primary }}
						textColor={colors.black}
					>
						Adicionar
					</Button>
				</View>
			</ScrollView>
		</>
	);
};

export default AdventureForm;
