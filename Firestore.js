import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDgt-zDXY8SOawuKIFVn6o1Mjddzmlqg-k",
  authDomain: "pdfbuilder-ce81a.firebaseapp.com",
  projectId: "pdfbuilder-ce81a",
  storageBucket: "pdfbuilder-ce81a.appspot.com",
  messagingSenderId: "287077663365",
  appId: "1:287077663365:web:4fe58349f6a64fa7f4dfec",
  measurementId: "G-56RHH01JE9",
});

const db = getFirestore(firebaseApp);

export default db;
