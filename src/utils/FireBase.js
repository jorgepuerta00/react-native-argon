import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCczhUT92YJuSP-uc-3IRzDGlMMX3NqU3I",
    authDomain: "appmovilcmadrid.firebaseapp.com",
    databaseURL: "https://appmovilcmadrid.firebaseio.com",
    projectId: "appmovilcmadrid",
    storageBucket: "appmovilcmadrid.appspot.com",
    messagingSenderId: "796279763948",
    appId: "1:796279763948:web:30182eac0c100e4f5406c9",
    measurementId: "G-HDZP0GL7EB"
  };

  export const  firebaseApp = firebase.initializeApp(firebaseConfig);