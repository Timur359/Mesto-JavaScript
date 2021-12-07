import '../pages/index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCard } from './initial-cards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Константы

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const popupZoom = document.querySelector('.popup_zoom');

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
 profileNameSelector: '.profile__name',
 profileAboutSelector: '.profile__about',
 inputNameSelector: '.popup__input_data_name',
 inputAboutSelector: '.popup__input_data_about',
};

//Константы для создания классов

const listElement = document.querySelector('.elements');
const templateItem = document.querySelector('#template').content;
const cardList = new Section(
 {
  items: initialCard,
  renderer: createCard,
 },
 listElement
);
const popupAdd = document.querySelector('.popup_add');

//Создание карточки
function createCard(item) {
 const card = new Card(item, templateItem, handleCardClick);
 return card;
}

//Добавление распределенных элементов В html(из массива)

initialCard.forEach((item) => {
 cardList.addItem(item);
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

function handleCardClick(title, link) {
 popupImageZoom.open(title, link);
}

//ОБРАБОТКА ПРОФИЛЯ

const popupFormEdit = new PopupWithForm(popupEdit, submitForm);
popupFormEdit.setEventListeners();

const userInfo = new UserInfo({
 selectorName: selectorObject.profileNameSelector,
 selectorAbout: selectorObject.profileAboutSelector,
 inputName: selectorObject.inputNameSelector,
 inputAbout: selectorObject.inputAboutSelector,
});

function openedPopupEdit() {
 userInfo.getUserInfo();
 validFormPopupEdit.resetValidationState();
 popupFormEdit.open();
}

editButton.addEventListener('click', openedPopupEdit);

//Функция сохранения редактирования профиля

function submitForm() {
 userInfo.setUserInfo();
 popupFormEdit.close();
}

//ОБРАБОТКА ЗУМА

const popupImageZoom = new PopupWithImage(popupZoom);
popupImageZoom.setEventListeners();

//ОБРАБОТКА ДОБАВЛЕНИЯ КАРТОЧЕК

const popupAddForm = new PopupWithForm(popupAdd, addItemList);
popupAddForm.setEventListeners();

//Кнопка добавления карточки

const buttonAdd = document.querySelector('.profile__add-button');
buttonAdd.addEventListener('click', () => {
 popupAddForm.open();
 validFormPopupAddCard.resetValidationState();
});

//Добавление элементов в массив
function addItemList(item) {
 cardList.addItem(item);
 popupAddForm.close();
}
