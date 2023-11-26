import { auth } from './config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

const loginForm = document.querySelector('#loginForm');
const loginEmail = document.querySelector('#loginEmail');
const loginPass = document.querySelector('#loginPass');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value)
    .then((userCredential) => {
      const user = userCredential.user.uid;
      console.log(user);
      window.location = './todo.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode ==>', errorCode);
      console.log('errorMessage ==>', errorMessage);
    });
});
