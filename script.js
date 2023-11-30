import { auth } from './config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

const signUpBtn = document.querySelector('#signup-btn');
const formEl = document.querySelector('#registerForm');
const regEmail = document.querySelector('#email');
const regPass = document.querySelector('#password');
const goggleSignUp = document.querySelector('.fa-google');
const fbSignUp = document.querySelector('.fb-signup');

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

// Google signup

const provider = new GoogleAuthProvider();

goggleSignUp.addEventListener('click', () => {
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

// facebook signup

const providerFacebook = new FacebookAuthProvider();

fbSignUp.addEventListener('click', () => {
  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(accessToken);
      // window.location = 'todo.html'

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      console.log(email);
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(credential);

      // ...
    });
});

// -----------------------------------------
