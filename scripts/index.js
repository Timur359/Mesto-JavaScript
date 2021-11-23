import CardsList from '../components/CardsList.js';
import Card from '../components/Card.js';
import FormAddCard from '../components/FormAddCard.js';
import Popup from '../components/Popup.js';
import FormValidator from '../components/FormValidator.js';
import { initialCard } from './initial-cards.js';

//Константы
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const editButton = document.querySelector('.profile__edit-button');

const popupSet = [...document.querySelectorAll('.popup')];
const popupEdit = document.querySelector('.popup_edit');
const formEdit = document.querySelector('.popup__form_edit');
const popupCloseButtonEdit = document.querySelector('.popup__close_edit');

const nameField = document.querySelector('.popup__input_data_name');
const aboutField = document.querySelector('.popup__input_data_about');

const popupZoom = document.querySelector('.popup_zoom');
const buttonClosePopupZoom = document.querySelector('.popup__close_zoom');

const ESC_KEYCODE = 27;

const configPopup = {
 popupOpenClassName: 'popup_open',
};

const validationObject = {
 formSelector: '.popup__form',
 inputSelector: '.popup__input',
 submitButtonSelector: '.popup__button',
 inputErrorClass: 'popup__input_type_error',
 inactiveButtonClass: 'popup__button_disabled',
 errorClass: 'popup__error_visible',
};

const selectorObject = {
 popupProfileSelector: '.popup_edit',
 popupAddCardSelector: '.popup_add',
};

//Константы для создания классов

const listElement = document.querySelector('.elements');
const templateItem = document.querySelector('#template').content;
const cardList = new CardsList(listElement, initialCard, createCard);
const formAddCardElement = document.querySelector('.popup__form_add');
const popupAdd = document.querySelector('.popup_add');
const popupAddForm = new Popup(configPopup, popupAdd);
popupAddForm.setEventListeners();

//Функция закрытия на ESC

function closePopupToEsc(event) {
 if (event.keyCode === ESC_KEYCODE) {
  const popupOpened = document.querySelector('.popup_open');
  closePopup(popupOpened);
 }
}

//Функции открытия и закрытия popup на esc (добавление слушателя)

function openPopup(popup) {
 popup.classList.add('popup_open');
 document.addEventListener('keydown', closePopupToEsc);
}

function closePopup(popup) {
 popup.classList.remove('popup_open');
 document.removeEventListener('keydown', closePopupToEsc);
}

//Функции открытия редактирования профиля

function openedPopupEdit() {
 nameField.value = profileName.textContent;
 aboutField.value = profileAbout.textContent;
 validFormPopupEdit.resetValidationState();
 openPopup(popupEdit);
}

editButton.addEventListener('click', openedPopupEdit);

//Закрытие редактирования профиля

popupCloseButtonEdit.addEventListener('click', () => {
 closePopup(popupEdit);
});

//Функция сохранения редактирования профиля

function submitForm(event) {
 event.preventDefault();
 profileName.textContent = nameField.value;
 profileAbout.textContent = aboutField.value;
 closePopup(popupEdit);
}

formEdit.addEventListener('submit', submitForm);

//Добавление карточек в массив
const formAddCard = new FormAddCard(formAddCardElement, addItem, configPopup);
formAddCard.addListener();

//Создание карточки
function createCard(item) {
 const card = new Card(item, templateItem, openPopupZoom);
 return card;
}

//Добавление элементов в массив
function addItem(item) {
 cardList.addItem(item);
 popupAddForm.close();
}

//Добавление распределенных элементов В html(из массива)

initialCard.forEach((item) => {
 cardList.addItem(item);
});

//Кнопка добавления карточки

const buttonAdd = document.querySelector('.profile__add-button');
buttonAdd.addEventListener('click', () => {
 popupAddForm.open();
 formAddCardElement.reset();
 validFormPopupAddCard.resetValidationState();
});

//Валидация форм

const validFormPopupAddCard = new FormValidator(
 validationObject,
 selectorObject.popupAddCardSelector
);
validFormPopupAddCard.enableValidation();

const validFormPopupEdit = new FormValidator(
 validationObject,
 selectorObject.popupProfileSelector
);
validFormPopupEdit.enableValidation();

//Открытие и закрытие зума

function openPopupZoom() {
 openPopup(popupZoom);
}

buttonClosePopupZoom.addEventListener('click', () => {
 closePopup(popupZoom);
});

//Функции закрытия popup окна на оверлей

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
