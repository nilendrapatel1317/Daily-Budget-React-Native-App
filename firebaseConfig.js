import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA3s2KXFtIlWTqjx-i---YBzKDI-Mq7jKs",
  authDomain: "daily-budget-app-46d56.firebase.com",
  projectId: "daily-budget-app-46d56",
  storageBucket: "daily-budget-app-46d56.firebasestorage.app",
  messagingSenderId: "623121151325",
  appId: "1:623121151325:android:5370408eeb70a37912a4b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
