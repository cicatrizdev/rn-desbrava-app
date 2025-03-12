import { View } from 'react-native';
import React from 'react';
import { Adventure } from '../../context/adventures';
import { colors } from '../../styles/colors';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';

const AdventureCard = (adventure: Adventure) => {
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
				<Text variant='bodyMedium' style={{ color: colors.onSurface }} numberOfLines={1}>
					{adventure.date}
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
				onPress={() => {}}
			/>
		</View>
	);
};

export default AdventureCard;
