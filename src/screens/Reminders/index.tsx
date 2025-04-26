import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text } from 'react-native-paper';
import { colors } from '../../styles/colors';
import AppHeader from '../../components/AppHeader';
import notifee from '@notifee/react-native';

const Notifications = () => {
	const [notificationId, setNotificationId] = useState<number>(1);
	const testNotification = async () => {
		await notifee.requestPermission();

		const channelId = await notifee.createChannel({
			id: 'default',
			name: 'Default Channel',
		});

		await notifee.displayNotification({
			id: '90',
			title: '',
			body: '',
			android: {
				channelId,
				pressAction: {
					id: 'default',
				},
			},
		});
		setNotificationId(notificationId + 1);
	};

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
					onPress={testNotification}
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
