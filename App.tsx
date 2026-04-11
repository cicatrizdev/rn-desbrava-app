import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppRootNavigator from './src/navigation';

export default function App() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<StatusBar style='light' />
			<AppRootNavigator />
		</NavigationContainer>
	);
}
