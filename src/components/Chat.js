// @flow
import React, { Component } from 'react';
import { ActivityIndicator, View, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Fire from '../../Fire';


type Props = {
	name?: string,
};


export default class Chat extends React.Component<Props> {

	static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || 'Chat!',
	});

	state = {
		messages: [],
	};

	get user() {
		return {
			name: this.props.navigation.state.params.name,
			_id: Fire.shared.uid,
		};
	}

	render() {
		const mainContent = (
			<GiftedChat
				messages={this.state.messages}
				onSend={Fire.shared.send}
				user={this.user}
			/>
		);
		if (Platform.OS === 'android') {
			return (
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80} enabled>
					{mainContent}
				</KeyboardAvoidingView>
			);
		} else {
			return (<SafeAreaView style={{ flex: 1 }}>
				{mainContent}
			</SafeAreaView>)
		}
	}



	componentDidMount() {
		// const fireClass = Fire.shared;
		//   fireClass.assignChatID(this.state.name);
		//   fireClass.on(message =>
		//       this.setState(previousState => ({
		//       messages: GiftedChat.append(previousState.messages, message)
		//   })
		// ));
		Fire.shared.on(message =>
			this.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, message),
			}))
		);
	}
	componentWillUnmount() {
		Fire.shared.off();
	}
}

// export default Chat;
