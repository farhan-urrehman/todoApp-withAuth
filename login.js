import { auth } from './config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

const loginForm = document.querySelector('#loginForm');
const loginEmail = document.querySelector('#loginEmail');
const loginPass = document.querySelector('#loginPass');
const googleSignUp = document.querySelector('.fa-google');

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

// google signup

const provider = new GoogleAuthProvider();

googleSignUp.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      window.location = 'todo.html';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode==>', errorCode);
      console.log('errorMessage==>', errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
