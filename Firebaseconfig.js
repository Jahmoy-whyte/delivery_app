// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjjoOkSyZl3FLUbUufIYLQoDeYyIxsxhI",
  authDomain: "fir-learning-efa3c.firebaseapp.com",
  projectId: "fir-learning-efa3c",
  storageBucket: "fir-learning-efa3c.appspot.com",
  messagingSenderId: "362564033454",
  appId: "1:362564033454:web:466dc662cc824f583cc63f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// initialize auth
export const auth1 = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

