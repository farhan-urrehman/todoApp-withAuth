
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBM8KgAr9MmcQaOg052UZLcYiXeG3tHXBE",
  authDomain: "todo-app-auth-ca210.firebaseapp.com",
  projectId: "todo-app-auth-ca210",
  storageBucket: "todo-app-auth-ca210.appspot.com",
  messagingSenderId: "132703070375",
  appId: "1:132703070375:web:97a292f78453ca1d189382"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);