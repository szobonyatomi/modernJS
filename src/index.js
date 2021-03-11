import 'regenerator-runtime/runtime';
import { postsList, renderPosts, outPut, url } from './modules/getpost.js';
import { convertImage, image, imgValue } from './modules/imagerender';

const modalNewBg = document.querySelector('.modalNew-bg');
const modalBtn = document.querySelector('.newBtn');
const modalClose = document.querySelector('.modalNew-close');
const modalMoreBg = document.querySelector('.modalMore-bg');
const modalMoreClose = document.querySelector('.modalMore-close');

const nameValue = document.querySelector('#name-value');
const shortValue = document.querySelector('#short-value');

const addPostForm = document.querySelector('.add-post-form');
const descValue = document.querySelector('#body-value');

modalBtn.addEventListener('click', () => {
  modalNewBg.classList.add('modal-active');
});
modalClose.addEventListener('click', () => {
  modalNewBg.classList.remove('modal-active');
});
modalMoreClose.addEventListener('click', () => {
  modalMoreBg.classList.remove('modal-active');
});

postsList.innerHTML = outPut;

// create - insert new post
// method: POST

addPostForm.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameValue.value,
      shortDescription: shortValue.value,
      image: image,
      description: descValue.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
    })
    .then(() => location.reload());

  // RESET input field to empty after submit
  nameValue.value = '';
  shortValue.value = '';
  imgValue.value = '';
  descValue.value = '';
});

convertImage();
