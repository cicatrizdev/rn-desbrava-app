import { View, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text } from 'react-native-paper';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';

const Notifications = () => {
	return (
		<>
			<AppHeader title='Lembretes' />
			<View style={styles.container}>
				<Icon name='bell-outline' size={48} color={colors.primary} />
				<Text
					variant='bodyLarge'
					style={{ color: colors.onSurface, textAlign: 'center', marginTop: 16 }}
				>
					Você ainda não tem lembretes registrados
				</Text>
				<Button
					mode='contained'
					onPress={() => {}}
					style={{
						marginTop: 16,
						backgroundColor: colors.primary,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					textColor={colors.black}
				>
					<Icon name='plus' size={14} color={colors.black} />
					Adicionar lembrete
				</Button>
			</View>
		</>
	);
};

export default Notifications;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
