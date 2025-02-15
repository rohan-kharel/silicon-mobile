import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateEmail} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6eRdhg6EtrRPGA423DJIEIndaWy9UUZA",
  authDomain: "silicon-articles.firebaseapp.com",
  projectId: "silicon-articles",
  storageBucket: "silicon-articles.appspot.com",
  messagingSenderId: "404018682364",
  appId: "1:404018682364:web:4e60dd8548f29231eeba79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { 
  db, getFirestore, collection, getDocs, doc, getDoc, // Firestore
  auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateEmail, // Auth
};
export default app;
