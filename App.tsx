import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppRootNavigator from './src/navigation';
import { AdventuresProvider } from './src/context/adventures';
import { RemindersProvider } from './src/context/reminders';

export default function App() {
	return (
		<AdventuresProvider>
			<RemindersProvider>
				<NavigationContainer theme={DarkTheme}>
					<StatusBar style='light' />
					<AppRootNavigator />
				</NavigationContainer>
			</RemindersProvider>
		</AdventuresProvider>
	);
}
