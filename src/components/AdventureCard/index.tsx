import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Adventure } from '../../context/adventures';
import { colors } from '../../styles/colors';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';

const AdventureCard = (adventure: Adventure, onEditPress: () => void) => {
	const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

	useEffect(() => {
		Location.requestForegroundPermissionsAsync();
		Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, (location) => {
			setUserLocation(location);
		});
	}, []);

	const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
		const R = 6371;
		const dLat = (lat2 - lat1) * (Math.PI / 180);
		const dLon = (lon2 - lon1) * (Math.PI / 180);

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * (Math.PI / 180)) *
				Math.cos(lat2 * (Math.PI / 180)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;

		return Number(distance.toFixed(2));
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'flex-start',
				padding: 16,
			}}
		>
			<Image
				source={require('../../assets/logo.png')}
				style={{
					width: 80,
					height: 80,
				}}
				contentFit='contain'
			/>
			<View
				style={{
					flexDirection: 'column',
					justifyContent: 'space-between',
					flex: 1,
					marginLeft: 8,
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text variant='bodyMedium' style={{ color: colors.onSurface }} numberOfLines={1}>
						{adventure.date}
					</Text>
					<Text variant='bodyMedium' style={{ color: colors.onSurface }} numberOfLines={1}>
						{' '}
						- {adventure.location.address.split(', ')[1]}
					</Text>
				</View>
				<Text variant='bodyMedium' style={{ color: colors.onSurface }} numberOfLines={1}>
					{calculateDistance(
						userLocation?.coords.latitude,
						userLocation?.coords.longitude,
						adventure.location.latitude,
						adventure.location.longitude
					)}{' '}
					km
					<Icon name='map-marker' size={10} color={colors.onSurface} />
				</Text>
				<Text variant='titleMedium' style={{ color: colors.onSurface }} numberOfLines={1}>
					{adventure.name}
				</Text>
				<Text variant='bodyMedium' style={{ color: colors.onSurface }} numberOfLines={2}>
					{adventure.description}
				</Text>
			</View>
			<Icon
				name='pencil'
				size={24}
				color={colors.onSurface}
				style={{ marginLeft: 8 }}
				onPress={onEditPress}
			/>
		</View>
	);
};

export default AdventureCard;
