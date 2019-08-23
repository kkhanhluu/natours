/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapbox';

// DOM ELEMENT
const mapxBox = document.getElementById('map');
const loginForm = document.querySelector('.form');

if (mapxBox) {
  const locations = JSON.parse(mapxBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
