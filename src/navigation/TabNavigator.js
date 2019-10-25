import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// import screens
import Chat from '../components/Chat';
import LoginScreen from '../screens/LoginScreen';

const LoginStack = createStackNavigator(
	{
		Login: LoginScreen,
	}, {
		navigationOptions: {
			title: 'Login',
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				iconName = Platform.OS === 'ios' ? `ios-home` : 'md-home';
				return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
			},
			headerStyle: {
				backgroundColor: 'white',
				color: 'black'
			},
			headerTintColor: 'black',
		},
	}
);

const ChatStack = createStackNavigator(
	{
		Chat: Chat
	}, {
		navigationOptions: {
			header: null,
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				iconName = Platform.OS === 'ios' ? `ios-calendar` : 'md-calendar';
				return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
			},
		},
	}
);

export default createAppContainer(createBottomTabNavigator({
    Login: LoginStack,
	Chat: ChatStack,
	}, {
        headerLayoutPreset: 'center',
		tabBarOptions: {
			activeTintColor: '#7e947f',
			inactiveTintColor: '#bdc3c7'
		}
	}
));