//Константы
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const listElements = document.querySelector('.elements');
const initialCardsList = document.querySelector('#template').content;

const popupSet = [...document.querySelectorAll('.popup')];
const popupEdit = document.querySelector('.popup_edit');
const formEdit = document.querySelector('.popup__form_edit');
const placeName = document.querySelector('.popup__input_place_name');
const placeUrl = document.querySelector('.popup__input_place_url');
const popupCloseButtonEdit = document.querySelector('.popup__close_edit');

const popupAdd = document.querySelector('.popup_add');
const formAdd = document.querySelector('.popup__form_add');
const nameField = document.querySelector('.popup__input_data_name');
const aboutField = document.querySelector('.popup__input_data_about');
const popupCloseButtonAdd = document.querySelector('.popup__close_add');

const popupZoom = document.querySelector('.popup_zoom');
const buttonClosePopupZoom = document.querySelector('.popup__close_zoom');

const ESC_KEYCODE = 27;

//Функция закрытия на ESC

function closePopupToEsc(event) {
  if (event.keyCode === ESC_KEYCODE) {
    const popupOpened = document.querySelector('.popup_open');
    closePopup(popupOpened);
  }
}

//Функции открытия и закрытия popup

function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupToEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupToEsc);
}

//Функции обработки изменений профиля

function openedPopupEdit() {
  nameField.value = profileName.textContent;
  aboutField.value = profileAbout.textContent;
  openPopup(popupEdit);
  abc(formEdit, validationConfig);
}

editButton.addEventListener('click', openedPopupEdit);

popupCloseButtonEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

function submitForm() {
  profileName.textContent = nameField.value;
  profileAbout.textContent = aboutField.value;
  closePopup(popupEdit);
}

formEdit.addEventListener('submit', submitForm);

//Функции обработки добавления, приближения и удаления карточек

addButton.addEventListener('click', () => {
  placeUrl.value = '';
  placeName.value = '';
  openPopup(popupAdd);
  abc(formAdd, validationConfig);
});

popupCloseButtonAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

function addCardButton() {
  const name = placeName.value;
  const link = placeUrl.value;
  const item = {
    name,
    link,
  };
  addInitialCards(item);
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', addCardButton);

buttonClosePopupZoom.addEventListener('click', () => {
  closePopup(popupZoom);
});

initialCards.forEach(addInitialCards);

function createElement(item) {
  const elementCard = initialCardsList
    .querySelector('.element')
    .cloneNode(true);
  elementCard.querySelector('.element__text').textContent = item.name;
  elementCard.querySelector('.element__image').src = item.link;
  elementCard.querySelector('.element__image').alt = item.name;
  elementCard
    .querySelector('.element__button_delete')
    .addEventListener('click', (event) => {
      event.target.closest('.element').remove();
    });
  elementCard
    .querySelector('.element__button_like')
    .addEventListener('click', (event) => {
      event.target.classList.toggle('element__button_like_active');
    });
  const imageZoom = document.querySelector('.popup__image');
  const altZoom = document.querySelector('.popup__figcaption');
  elementCard
    .querySelector('.element__image')
    .addEventListener('click', (event) => {
      openPopup(popupZoom);
      imageZoom.src = event.target.src;
      imageZoom.alt = event.target.alt;
      altZoom.textContent = event.target.alt;
    });
  return elementCard;
}

function addInitialCards(item) {
  const elementCard = createElement(item);
  listElements.prepend(elementCard);
}

//Функции закрытия popup окна

function closePopupClick(popupSet) {
  popupSet.forEach((item) => {
    item
      .querySelector('.popup__overlay')
      .addEventListener('click', function (evt) {
        closePopup(item);
      });
  });
}

closePopupClick(popupSet);

enableValidation(validationConfig);
