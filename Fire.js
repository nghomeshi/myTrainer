import firebase from 'firebase'; // 4.8.1

class Fire {
	constructor() {
		this.init();
		this.observeAuth();
		// this.ChatID = ``;
	}

	//  assignChatID(ChatID){
	//   this.ChatID = ChatID;
	// }

	init = () =>
		firebase.initializeApp({
			apiKey: "AIzaSyApCIXXl0L8g4e_C-9367UMTL-BYLNKVVw",
			authDomain: "mytrainer-e7dde.firebaseapp.com",
			databaseURL: "https://mytrainer-e7dde.firebaseio.com",
			projectId: "mytrainer-e7dde",
			storageBucket: "mytrainer-e7dde.appspot.com",
			messagingSenderId: "963220138408",
		});


	observeAuth = () =>
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

	onAuthStateChanged = user => {
		if (!user) {
			try {
				firebase.auth().signInAnonymously();
			} catch ({ message }) {
				alert(message);
			}
		}
	};

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

	// get ref() {
	//   return firebase.database().ref('chats');
	// }

	get ref() {
		// return firebase.database().ref(`chats/${firebase.auth().currentUser.uid}/${this.ChatID}`);
		return firebase.database().ref('messages');
	}

	parse = snapshot => {
		const { timestamp: numberStamp, text, user } = snapshot.val();
		const { key: _id } = snapshot;
		const timestamp = new Date(numberStamp);
		const message = {
			_id,
			timestamp,
			text,
			user,
		};
		return message;
	};

	on = callback =>
		this.ref
			.limitToLast(20)
			.on('child_added', snapshot => callback(this.parse(snapshot)));

	get timestamp() {
		return firebase.database.ServerValue.TIMESTAMP;
	}
	// send the message to the Backend
	send = messages => {
		for (let i = 0; i < messages.length; i++) {
			const { text, user } = messages[i];
			const message = {
				text,
				user,
				timestamp: this.timestamp,
			};
			this.append(message);
		}
	};

	append = message => this.ref.push(message);

	// close the connection to the Backend
	off() {
		this.ref.off();
	}
}

Fire.shared = new Fire();
export default Fire;
