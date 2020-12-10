import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBCfzcPPvZXDhU5UCOHVuaHBZzfWe-POh4',
  authDomain: 'energia-test.firebaseapp.com',
  databaseURL: 'https://energia-test-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'energia-test',
  storageBucket: 'energia-test.appspot.com',
  messagingSenderId: '177258643281',
  appId: '1:177258643281:web:16f518287d69956be3dd70',
};
// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);

export const db = fire.firestore();
