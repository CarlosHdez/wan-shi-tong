import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'

import App from './App'
import './stylesheets/index.scss'

// TODO: Move to an .env file
const firebaseConfig = {
  apiKey: "AIzaSyDdVOl9QEljM85UWypzJBaZo6wCi35fsFk",
  authDomain: "wan-shi-tong-9bf7e.firebaseapp.com",
  databaseURL: "https://wan-shi-tong-9bf7e.firebaseio.com",
  projectId: "wan-shi-tong-9bf7e",
  storageBucket: "wan-shi-tong-9bf7e.appspot.com",
  messagingSenderId: "364668558048",
  appId: "1:364668558048:web:3349198d2642116e"
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'))
