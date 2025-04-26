import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text } from 'react-native-paper';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigation';
import { useReminders } from '../../context/reminders';

const Notifications = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const { reminders, deleteReminder } = useReminders();

	return (
		<>
			<AppHeader title='Lembretes' />
			<View style={styles.container}>
				{reminders.length === 0 ? (
					<>
						<Icon name='bell-outline' size={48} color={colors.primary} />
						<Text
							variant='bodyLarge'
							style={{ color: colors.onSurface, textAlign: 'center', marginTop: 16 }}
						>
							Você ainda não tem lembretes registrados
						</Text>
					</>
				) : (
					<>
						<FlatList
							data={reminders}
							renderItem={({ item }) => (
								<TouchableOpacity onPress={() => deleteReminder(item.id)}>
									<Text>
										{item.title} - {item.date}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</>
				)}
				<Button
					mode='contained'
					onPress={() => navigation.navigate('RemindersForm')}
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
