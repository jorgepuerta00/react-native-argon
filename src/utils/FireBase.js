import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "********************************************",
    authDomain: "****************************************",
    databaseURL: "***************************************",
    projectId: "*****************************************",
    storageBucket: "*************************************",
    messagingSenderId: "*********************************",
    appId: "*********************************************",
    measurementId: "*************************************",
  };

  export const  firebaseApp = firebase.initializeApp(firebaseConfig);
