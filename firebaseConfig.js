import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCuPEuULxu7XPlhE0NTClXHKhmFHU-nA14",
  authDomain: "my-app-8bc86.firebaseapp.com",
  projectId: "my-app-8bc86",
  storageBucket: "my-app-8bc86.appspot.com",
  messagingSenderId: "624645809971",
  appId: "1:624645809971:web:56951ba25d172521e94046",
  measurementId: "G-0YYCJ4Q4HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);