import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCYyTGNC3ogS8OWx3Yd4x0o4W0Kw7Dr3A",
  authDomain: "fineday-3827a.firebaseapp.com",
  projectId: "fineday-3827a",
  storageBucket: "fineday-3827a.firebasestorage.app",
  messagingSenderId: "655529493515",
  appId: "1:655529493515:web:3e3a0302ccfff12bbfb30e"
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);