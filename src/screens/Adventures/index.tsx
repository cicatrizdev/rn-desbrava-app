import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../styles/colors';
import { Button, Divider, Headline, IconButton, Text } from 'react-native-paper';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { useAdventures } from '../../context/adventures';
import AdventureCard from '../../components/AdventureCard';

const EmptyAdventure = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
			<Icon name='snowboard' size={48} color={colors.primary} />

			<Text
				variant='bodyLarge'
				style={{ color: colors.onSurface, textAlign: 'center', marginTop: 16 }}
			>
				Parece que você ainda não tem aventuras registradas, mas é sempre hora de começar!
			</Text>
			<Button
				mode='contained'
				onPress={() => navigation.navigate('AdventureForm')}
				style={{ marginTop: 16, backgroundColor: colors.primary }}
				textColor={colors.black}
			>
				Adicionar aventura!
			</Button>
		</View>
	);
};

const Adventures = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const { adventures } = useAdventures();
	return (
		<>
			<AppHeader title='Minhas aventuras' icon='magnify' onPress={() => {}} />
			<View style={styles.container}>
				{adventures.length === 0 ? (
					<EmptyAdventure />
				) : (
					<>
						<FlatList
							data={adventures}
							renderItem={({ item }) => <AdventureCard key={item.id} {...item} />}
							style={{ flex: 1 }}
							contentContainerStyle={{ flex: 1 }}
							ItemSeparatorComponent={() => <Divider style={{ marginVertical: 8 }} />}
						/>
						<IconButton
							icon='plus'
							size={30}
							onPress={() => navigation.navigate('AdventureForm')}
							style={{
								position: 'absolute',
								bottom: 10,
								right: 0,
								borderRadius: 16,
								backgroundColor: colors.primary,
							}}
						/>
					</>
				)}
			</View>
		</>
	);
};

export default Adventures;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
