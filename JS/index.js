/* eslint-disable no-undef */

// PopUp Form
const popUpForm = document.getElementById('signUpForm');
const openPopUp = document.getElementById('signUp-Btn');
const overlay = document.getElementById('overlay');
const closePopUp = document.querySelectorAll('.close');
const submitFormBtn = document.getElementById('submitForm');
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


document.querySelector('form').addEventListener('submit', (e)=>{
  e.preventDefault()
  submit();
})

// Ham menu
const nav = document.getElementById('nav');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');

openBtn.addEventListener('click', () => {
  nav.style.top = '0vh';
  openBtn.style.zIndex = '-1';
  openBtn.style.opacity = '0';
  closeBtn.style.zIndex = '3';
  closeBtn.style.opacity = '1';
});
closeBtn.addEventListener('click', () => {
  nav.style.top = '-100vh';
  closeBtn.style.zIndex = '-1';
  closeBtn.style.opacity = '0';
  openBtn.style.zIndex = '3';
  openBtn.style.opacity = '1';
});

// Transitions
window.sr = ScrollReveal();

sr.reveal(
  '.left-In1',
  {
    origin: 'left',
    distance: '100px',
    duration: 1000,
    delay: 500,

  },
);

sr.reveal(
  '.bottom-In',
  {
    origin: 'bottom',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.4,

  },
);

sr.reveal(
  '.bottom-InDelay',
  {
    origin: 'bottom',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.4,
    delay: 500,

  },
);

sr.reveal(
  '.fade-In',
  {
    duration: 2000,
    opacity: 0,

  },
);

sr.reveal(
  '.fade-In-fast',
  {
    duration: 1000,
    opacity: 0,

  },
);

sr.reveal(
  '.left-In2',
  {
    origin: 'left',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,

  },
);
sr.reveal(
  '.top-In',
  {
    origin: 'top',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,

  },
);
sr.reveal(
  '.item1-up-In',
  {
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,

  },
);

sr.reveal(
  '.item2-up-In',
  {
    delay: 100,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,

  },
);
sr.reveal(
  '.item3-up-In',
  {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,

  },
);
sr.reveal(
  '.item4-up-In',
  {
    delay: 300,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,

  },
);
sr.reveal(
  '.item5-up-In',
  {
    delay: 400,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,
  },
);

sr.reveal(
  '.left-In3',
  {
    origin: 'left',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,

  },
);
sr.reveal(
  '.right-In',
  {
    origin: 'right',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,
    delay: 500,
  },
);

