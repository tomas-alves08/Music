import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC86oZay8_2zzS1iTa32acDk4vmOcfOv4Q',
  authDomain: 'music-6704b.firebaseapp.com',
  projectId: 'music-6704b',
  storageBucket: 'music-6704b.appspot.com',
  appId: '1:416305393683:web:d008aba784c129072ccfe6'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection("users")

export { auth, db, usersCollection }
