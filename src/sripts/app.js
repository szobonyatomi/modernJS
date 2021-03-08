const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.add-post-form');
const nameValue = document.querySelector('#name-value');
const shortValue = document.querySelector('#short-value');
const imgValue = document.getElementById('image-value');
const descValue = document.querySelector('#body-value');
const btnSubmit = document.querySelector('.btn-submit');
const modalNewBg = document.querySelector('.modalNew-bg');
const modalBtn = document.querySelector('.newBtn');
const modalClose = document.querySelector('.modalNew-close');
const modalMoreBg = document.querySelector('.modalMore-bg');
const modalMoreClose = document.querySelector('.modalMore-close');
const cardName = document.querySelector('.card-name');
const cardDescr = document.querySelector('.descr');
const cardImage = document.querySelector('#moreImage');

modalBtn.addEventListener('click', () => {
  modalNewBg.classList.add('modal-active');
});
modalClose.addEventListener('click', () => {
  modalNewBg.classList.remove('modal-active');
});
modalMoreClose.addEventListener('click', () => {
  modalMoreBg.classList.remove('modal-active');
});

let outPut = '';

const renderPosts = (posts) => {
  posts.forEach((post) => {
    outPut += `
        <div class="card-id" data-id=${post.id}>

            <img class ="image-card" src="data:image/png;base64,${post.image}" data-img=${post.image}">

                <div class="card-infos" id="cardInfo" data-id=${post.id}>
                    <h5 class="card-name">${post.name}</h5>
                    <p class="card-short">${post.shortDescription}</p>
                    <p class="description">${post.description}</p>

                </div>

                <div class="btns" data-id=${post.id}>
                    <button class="btn " id="moreBtn"></button>
                    <button class="btn " id="editBtn"></button>
                    <button class="btn " id="deleteBtn"></button>
                    <p class="card-name  ">${post.name}</p>
                    <p class="card-short ">${post.shortDescription}</p>
                    <p class="description">${post.description}</p>
                    <p class="image">${post.image}</p>
            </div>

        </div> 
        `;
  });
  postsList.innerHTML = outPut;
};

const url = 'https://character-database.becode.xyz/characters';

// Get read the posts
// Method:Get

fetch(url)
  .then((response) => response.json())
  .then((data) => renderPosts(data));

postsList.addEventListener('click', (event) => {
  //event.preventDefault();
  let delBtnPressed = event.target.id == 'deleteBtn';
  let editBtnPressed = event.target.id == 'editBtn';
  let moreBtnPressed = event.target.id == 'moreBtn';

  let idData = event.target.parentElement.dataset.id;
  console.log(idData);

  //Delete - remove existing post
  // method: DELETE

  if (delBtnPressed) {
    fetch(`${url}/${idData}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => location.reload()); //refresh the window
  }

  //Edit - change existing post
  // method: GET

  if (editBtnPressed) {
    modalNewBg.classList.add('modal-active');
    const cardData = event.target.parentElement;
    let nameContent = cardData.querySelector('.card-name').textContent;
    let shortContent = cardData.querySelector('.card-short').textContent;
    let imageContent = cardData.querySelector('.image-card');

    nameValue.value = nameContent;
    shortValue.value = shortContent;
    imgValue.value = imageContent;
  }
  // update - update the existing post
  //method: PATCH

  btnSubmit.addEventListener('click', (e) => {
    console.log('post update!');
    e.preventDefault(); //to not repeat the submit
    fetch(`${url}/${idData}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameValue.value,
        shortDescription: shortValue.value,
        image: imgValue.value,
      }),
    })
      .then((response) => response.json())
      .then(() => location.reload());
  });

  //Details - Show existing post
  // method: GET

  if (moreBtnPressed) {
    modalMoreBg.classList.add('modal-active');
    const cardData = event.target.parentElement;
    let nameContent = cardData.querySelector('.card-name').textContent;
    let Content = cardData.querySelector('.description').textContent;
    let imageContent = cardData.querySelector('.image').textContent;

    cardName.innerHTML = nameContent;
    cardDescr.innerHTML = Content;

    let att = document.createAttribute('src');
    att.value = 'data:image/png;base64,' + imageContent;
    cardImage.setAttributeNode(att);
  }
});

function encodeImageFileAsURL() {
  let imgValue = document.querySelector('#image-value').files;
  if (imgValue.length > 0) {
    let fileToLoad = imgValue[0];

    let fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      let newSrc = fileLoadedEvent.target.result.replace(
        /^data:image\/\w+;base64,/,
        ''
      );

      let newImage = document.createElement('img');
      newImage.src = newSrc;

      document.getElementById('imgTest').innerHTML = newImage.innerHTML;

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
            image: newSrc,
            description: descValue.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
          });

        // RESET input field to empty after submit
        nameValue.value = '';
        shortValue.value = '';
        imgValue.value = '';
        descValue.value = '';
      });
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}
