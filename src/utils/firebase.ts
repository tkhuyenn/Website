import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
const config = {
  apiKey: 'AIzaSyBlcNGUsMP-uXbR5Uh-q2qjDeOksJauSqA',
  authDomain: 'lynkey-test-2.firebaseapp.com',
  databaseURL: 'https://lynkey-test-2-default-rtdb.firebaseio.com',
  projectId: 'lynkey-test-2',
  storageBucket: 'lynkey-test-2.appspot.com',
  messagingSenderId: '752429299394',
  appId: '1:752429299394:web:d96e11fa6940a0e0eaed5b',
  measurementId: 'G-416YH24V5B'
}
firebase.initializeApp(config)

export default firebase
