import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppRootNavigator from './src/navigation';
import { AdventuresProvider } from './src/context/adventures';

export default function App() {
	return (
		<AdventuresProvider>
			<NavigationContainer theme={DarkTheme}>
				<StatusBar style='light' />
				<AppRootNavigator />
			</NavigationContainer>
		</AdventuresProvider>
	);
}
