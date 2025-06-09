// src/firebase/FirebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoBjh-QXzEXzpaR4kJxYrU4nz8Vw4huIA",
  authDomain: "srajinfraprojectprivatelimited.firebaseapp.com",
  projectId: "srajinfraprojectprivatelimited",
  storageBucket: "srajinfraprojectprivatelimited.appspot.com",
  messagingSenderId: "1091272874105",
  appId: "1:1091272874105:web:ffecdaa93c07cf2c405ca8",
  measurementId: "G-RJNFGVSSH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
