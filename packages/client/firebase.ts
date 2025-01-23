import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // databaseURL: 'https://project-id.firebaseio.com',
  apiKey: "AIzaSyA3e1QyxINoS_6OtUxXc6oJikyW4EHlEoI",
  authDomain: "adiva-8fc7b.firebaseapp.com",
  projectId: "adiva-8fc7b",
  storageBucket: "adiva-8fc7b.firebasestorage.app",
  messagingSenderId: "645646066538",
  appId: "1:645646066538:web:102866d77470f089f43b13",
  measurementId: "G-ECEHFEHEMJ"
};

const app = initializeApp(firebaseConfig);

export default app;
