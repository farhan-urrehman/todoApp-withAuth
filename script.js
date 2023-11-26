import { auth } from './config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

const signUpBtn = document.querySelector('#signup-btn');
const formEl = document.querySelector('#registerForm');
const regEmail = document.querySelector('#email');
const regPass = document.querySelector('#password');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, regEmail.value, regPass.value)
    .then((userCredential) => {
      const user = userCredential.user.uid;
      window.location = 'login.html';
      console.log(user);
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode ==>', errorCode);
      console.log('errorMessage ==>', errorMessage);
    });
});
