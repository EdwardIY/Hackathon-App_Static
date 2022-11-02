
import './kit.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
// PopUp Form
const popUpForm = document.getElementById('signUpForm')!;
const openPopUp = document.getElementById('signUp-Btn')!;
const overlay = document.getElementById('overlay')!;
const closePopUp = document.querySelectorAll('.close')!;
let submitted = false;

function submit() {
  // localStorage.setItem("submitted","true")
  popUpForm.innerHTML = '<h1>Thank You for your Interest</h1>';
  popUpForm.style.padding = '4em 0em';
  popUpForm.style.fontFamily = 'Shadows Into Light, Arial, Helvetica, sans-serif';
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-1';
    popUpForm.style.opacity = '0';
    popUpForm.style.zIndex = '-1';
    popUpForm.style.zIndex = '-1';
    document.body.style.overflowY = 'initial';
  }, 1500);
  submitted = true;
}

openPopUp.addEventListener('click', () => {
  overlay.style.opacity = '1';
  overlay.style.zIndex = '3';
  popUpForm.style.opacity = '1';
  popUpForm.style.zIndex = '3';
  document.body.style.overflowY = 'hidden';
  if (submitted) submit();
  // if(localStorage.getItem("submitted") == "true") submit();
});

closePopUp.forEach((x) => {
  x.addEventListener('click', () => {
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-1';
    popUpForm.style.opacity = '0';
    popUpForm.style.zIndex = '-1';
    document.body.style.overflowY = 'initial';
  });
});

document.querySelector('form')!.addEventListener('submit', (e) => {
  e.preventDefault();
  submit();
});


// Blog
const firebaseConfig = {
  apiKey: "AIzaSyCFnKFOaeDVrWFcotnHGLqWKpABnCtqq08",
  authDomain: "college-blog-38818.firebaseapp.com",
  projectId: "college-blog-38818",
  storageBucket: "college-blog-38818.appspot.com",
  messagingSenderId: "821421394859",
  appId: "1:821421394859:web:17934e0b4cf79d64c660ee",
  measurementId: "G-5WWZ2RTHX5"
};
const app = initializeApp(firebaseConfig);
const db  = getDatabase()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']


// FORM
const postForm = document.getElementById('postForm')!;
const usernameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('emailInput') as HTMLInputElement;
const bodyInput = document.getElementById('body') as HTMLInputElement;

console.log(usernameInput)
console.log(emailInput)
console.log(bodyInput)

postForm.addEventListener('submit', (e)=>{
 
  e.preventDefault();
  writePost(usernameInput.value,bodyInput.value,emailInput.value)
})

// COMMENTS
const commentsContainer = document.getElementById('comments')!;
const numOfComments = document.getElementById('num')!;
let comments = "";

async function writePost(username:string,post:string,email:string) {
  const lengthRequest = await fetch('https://college-blog-38818-default-rtdb.firebaseio.com/.json')
  const res = await lengthRequest.json()
  
  let id;
  if(!res) {
    id = 0;
  } else id = +Object.keys(res.post).slice(-1) + 1;

  const reference  = ref(db, 'post/' + id)
  if(email) {
   await set(reference, {username,body: post, email})
    updatePost()
  } 
  else {
    await set(reference, {username,body: post,date: {
      month: months[new Date().getMonth()],
      dayOfMonth: new Date().getDate(),
      year: new Date().getFullYear()
    }})
      updatePost()
  }
  
}


updatePost()
function updatePost() {
  fetch('https://college-blog-38818-default-rtdb.firebaseio.com/.json')
  .then((res)=> res.json())
  .then((data)=> {

    if(!data) {
      commentsContainer.innerHTML = "<h3> No posts..</h3>";
      numOfComments.textContent = '0'
    }
    else {
      console.log(data);
      Object.keys(data.post).forEach((x,i)=>{
        console.log(data.post[i])
        comments += `<h4>${data.post[x].username} - <span>${data.post[i].date.month}, ${data.post[i].date.dayOfMonth} ${data.post[i].date.year}</span></h4><p>${data.post[x].body}</p> <br>`;
      })
      numOfComments.textContent = Object.keys(data.post).length.toString()
      commentsContainer.innerHTML = comments
      comments = ""
    }
   
  })
  
}