import { View, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../styles/colors';
import { Button, Headline, Text } from 'react-native-paper';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';

const Adventures = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	return (
		<>
			<AppHeader title='Minhas aventuras' icon='magnify' onPress={() => {}} />
			<View style={styles.container}>
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
