"use strict";
/* eslint-disable no-undef */
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
sr.reveal('.left-In1', {
    origin: 'left',
    distance: '100px',
    duration: 1000,
    delay: 500,
});
sr.reveal('.bottom-In', {
    origin: 'bottom',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.4,
});
sr.reveal('.bottom-InDelay', {
    origin: 'bottom',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.4,
    delay: 500,
});
sr.reveal('.fade-In', {
    duration: 2000,
    opacity: 0,
});
sr.reveal('.fade-In-fast', {
    duration: 1000,
    opacity: 0,
});
sr.reveal('.left-In2', {
    origin: 'left',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,
});
sr.reveal('.top-In', {
    origin: 'top',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,
});
sr.reveal('.item1-up-In', {
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,
});
sr.reveal('.item2-up-In', {
    delay: 100,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,
});
sr.reveal('.item3-up-In', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,
});
sr.reveal('.item4-up-In', {
    delay: 300,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,
});
sr.reveal('.item5-up-In', {
    delay: 400,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.2,
});
sr.reveal('.left-In3', {
    origin: 'left',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,
});
sr.reveal('.right-In', {
    origin: 'right',
    distance: '100px',
    duration: 2000,
    viewFactor: 0.3,
    delay: 500,
});
