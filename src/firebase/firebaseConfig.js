// NOTE
// Please use your own firebase details below. For more details visit: https://Wilber Galindez.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html


import firebase from 'firebase/app'

// Initialize Firebase
const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'AUTH_DOMAIN',
  databaseURL: 'DB_URL',
  projectId: 'PROJECT_ID',
  storageBucket: 'BUCKET',
  messagingSenderId: 'SENDER_ID'
}

firebase.initializeApp(config)
