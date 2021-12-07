import '../pages/index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCard } from '../scripts/initial-cards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
 editButton,
 popupEdit,
 popupZoom,
 validationObject,
 selectorObject,
 listElement,
 templateItem,
 popupAdd,
 buttonAdd,
} from '../scripts/constants.js';

//Добавление массива

const cardList = new Section(
 {
  items: initialCard,
  renderer: createCard,
 },
 listElement
);

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

buttonAdd.addEventListener('click', () => {
 popupAddForm.open();
 validFormPopupAddCard.resetValidationState();
});

//Добавление элементов в массив
function addItemList(item) {
 cardList.addItem(item);
 popupAddForm.close();
}
