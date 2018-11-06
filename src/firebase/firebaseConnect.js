import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCno6m9XsuRbISdVa0KuztOid49ePHx89Q",
    authDomain: "data-app-chat.firebaseapp.com",
    databaseURL: "https://data-app-chat.firebaseio.com",
    projectId: "data-app-chat",
    storageBucket: "data-app-chat.appspot.com",
    messagingSenderId: "947787082311"
};
const firebaseConnect=firebase.initializeApp(config);
export default firebaseConnect ;

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:'select_account'
});