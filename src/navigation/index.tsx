import React from 'react';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';
import Adventures from '../screens/Adventures';
import Reminders from '../screens/Reminders';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AdventureForm from '../screens/AdventureForm';

export type RootStackParamList = {
	Adventures: undefined;
	Reminders: undefined;
	AdventureForm: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
	return (
		<Tab.Navigator
			id={undefined}
			screenOptions={{
				headerShown: false,
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					navigationState={state}
					safeAreaInsets={insets}
					style={{ backgroundColor: colors.container }}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(route.name, route.params),
								target: state.key,
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({ focused, color, size: 24 });
						}
						return null;
					}}
					activeColor={colors.onSurface}
					inactiveColor={colors.onSurface}
					activeIndicatorStyle={{ backgroundColor: colors.outline }}
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						const label =
							options.tabBarLabel !== undefined
								? options.tabBarLabel.toString()
								: options.title !== undefined
								? options.title
								: '';

						return label;
					}}
				/>
			)}
		>
			<Tab.Screen
				name='Aventuras'
				component={Adventures}
				options={{
					tabBarLabel: 'Aventuras',
					tabBarIcon: ({ color, size }) => {
						return <Icon name='walk' size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name='Lembretes'
				component={Reminders}
				options={{
					tabBarLabel: 'Lembretes',
					tabBarIcon: ({ color, size }) => {
						return <Icon name='bell' size={size} color={color} />;
					},
				}}
			/>
		</Tab.Navigator>
	);
}

const Stack = createStackNavigator();

export default function AppRootNavigator() {
	return (
		<Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Adventures' component={BottomTabNavigator} />
			<Stack.Screen name='AdventureForm' component={AdventureForm} />
		</Stack.Navigator>
	);
}
