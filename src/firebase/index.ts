import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkRItOCjhY_f4cakQ_5-g64VxoYarD6uc",
  authDomain: "tigil-70bb5.firebaseapp.com",
  projectId: "tigil-70bb5",
  storageBucket: "tigil-70bb5.appspot.com",
  messagingSenderId: "945685557658",
  appId: "1:945685557658:web:0637b000c5eb536de2ca23"
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export {
  db,
}
