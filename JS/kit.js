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
