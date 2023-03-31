import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArxsyFBiHQNI1-n7qqB7U-3vlrnkCm6KM",
  authDomain: "nermeen-netflix-clone.firebaseapp.com",
  projectId: "nermeen-netflix-clone",
  storageBucket: "nermeen-netflix-clone.appspot.com",
  messagingSenderId: "772595851993",
  appId: "1:772595851993:web:ea12f4b072c40cad7d94c8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const cloudStorage = getStorage(app);
