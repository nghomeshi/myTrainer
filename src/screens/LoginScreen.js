import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Sign in or register'
    };

    state = {
        username: '',
        password: '',
    }

    onPress = () =>
        this.props.navigation.navigate('Chat', { name: this.state.username });

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>myTrainer</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder='name...'
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.inputField}
                        placeholder='Password...'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.onPress}>
                            <Text style={styles.leftButton}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPress}>
                            <Text style={styles.rightButton}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 75,
        paddingVertical: 175,
        flex: 1
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowOpacity: 5,
        shadowColor: 'gray',
        shadowOffset: {
            width: -3,
            height: 3
        },
        padding: 5
    },
    title: {
        fontSize: 46,
        textAlign: 'center',
        paddingBottom: 30,
    },
    inputField: {
        height: 35,
        paddingLeft: 5,
        marginBottom: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'gray'
    },
    leftButton: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        fontSize: 24,
        // flex: 5

    },
    rightButton: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderBottomWidth: 0,
        // borderLeftWidth: 0.5,
        fontSize: 24,
        // flex: 5
    }
});

export default LoginScreen;