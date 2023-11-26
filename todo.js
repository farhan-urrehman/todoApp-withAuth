import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

const addTaskBtn = document.querySelector('.add-todo');
const delAllBtn = document.querySelector('.delete-all');
const logOutBtn = document.querySelector('.signout-btn');

const firebaseConfig = {
  apiKey: 'AIzaSyBM8KgAr9MmcQaOg052UZLcYiXeG3tHXBE',
  authDomain: 'todo-app-auth-ca210.firebaseapp.com',
  projectId: 'todo-app-auth-ca210',
  storageBucket: 'todo-app-auth-ca210.appspot.com',
  messagingSenderId: '132703070375',
  appId: '1:132703070375:web:97a292f78453ca1d189382',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

addTaskBtn.addEventListener('click', async () => {
  let getInp = document.querySelector('#getInp');
  if (getInp.value == ' ') {
    // alert('enter something');
    Swal.fire('You must enter something in the field');
  } else {
    const docRef = await addDoc(collection(db, 'tasks'), {
      name: getInp.value,
      time: new Date().toDateString(),
    });
    // console.log('Document written with ID: ', docRef.id);
    getInp.value = ' ';
  }
});

function getData() {
  let ul = document.querySelector('#getUl');
  onSnapshot(collection(db, 'tasks'), (data) => {
    data.docChanges().forEach((newData) => {
      if (newData.type == 'removed') {
        let delLi = document.getElementById(newData.doc.id);
        delLi.remove();
      } else if (newData.type == 'added') {
        // console.log(newData.doc.data());
        // console.log(newData);
        ul.innerHTML += `
        <div class="li-cont">
            <li id=${newData.doc.id}>
                ${newData.doc.data().name} 
                <br>
              
                ${newData.doc.data().time}
                
                
                    <button class="del-btn" onclick="delTodo('${
                      newData.doc.id
                    }')"><i class="fa-solid fa-x" ></i></button>
                    
                    <button onclick="editTodo(this,'${
                      newData.doc.id
                    }')"><i class="fa fa-edit"></i></button>
                
                
            </li>
        </div>
            `;
      }
    });
  });
}
getData();

// delete single task function

async function delTodo(id) {
  await deleteDoc(doc(db, 'tasks', id));
}

// delete all function

delAllBtn.addEventListener('click', async () => {
  const colRef = collection(db, 'tasks');
  const querySnapshot = await getDocs(colRef);
  const deleteOps = [];
  querySnapshot.forEach((doc) => {
    deleteOps.push(deleteDoc(doc.ref));
  });
  await Promise.all(deleteOps);
});

// edit function

async function editTodo(e, id) {
  // let editValue = prompt('Enter new value');
  const { value: text } = await Swal.fire({
    // input: "textarea",
    input: "text",
    inputLabel: "Edit",
    inputPlaceholder: "Type your message here...",
    inputAttributes: {
      "aria-label": "Type your new text here..."
    },
    showCancelButton: true
  });
  if (text) {
    Swal.fire(text);
  }

  let editValue = text
  
  
  e.parentNode.firstChild.nodeValue = editValue;
  await updateDoc(doc(db, 'tasks', id), {
    name: editValue,
    time: new Date().toDateString(),
  });
}

// logout function

logOutBtn.addEventListener('click', () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location = 'index.html'
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});

window.getData = getData;
window.delTodo = delTodo;
window.editTodo = editTodo;
