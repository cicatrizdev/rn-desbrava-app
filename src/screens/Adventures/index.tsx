import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../styles/colors';
import { Button, Headline, Text } from 'react-native-paper';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { useAdventures } from '../../context/adventures';

const Adventures = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const { adventures } = useAdventures();
	return (
		<>
			<AppHeader title='Minhas aventuras' icon='magnify' onPress={() => {}} />
			<ScrollView contentContainerStyle={styles.container}>
				<Icon name='snowboard' size={48} color={colors.primary} />
				{adventures.length === 0 ? (
					<Text
						variant='bodyLarge'
						style={{ color: colors.onSurface, textAlign: 'center', marginTop: 16 }}
					>
						Parece que você ainda não tem aventuras registradas, mas é sempre hora de começar!
					</Text>
				) : (
					<>
						<Text
							variant='bodyLarge'
							style={{ color: colors.onSurface, textAlign: 'center', marginTop: 16 }}
						>
							Você tem {adventures.length} aventura(s) registrada(s).
						</Text>
						{adventures.map((adventure) => (
							<View key={adventure.id}>
								<Text variant='bodyMedium' style={{ color: colors.onSurface }}>
									{adventure.name}
								</Text>
							</View>
						))}
					</>
				)}
				<Button
					mode='contained'
					onPress={() => navigation.navigate('AdventureForm')}
					style={{ marginTop: 16, backgroundColor: colors.primary }}
					textColor={colors.black}
				>
					Adicionar aventura!
				</Button>
			</ScrollView>
		</>
	);
};

export default Adventures;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
