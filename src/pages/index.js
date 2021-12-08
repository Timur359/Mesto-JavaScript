import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCard } from '../utils/initial-cards.js';
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
 profileNameInput,
 profileAboutInput,
} from '../utils/constants.js';

//Добавление массива

const cardList = new Section(
 {
  items: initialCard,
  renderer: (item) => {
   cardList.addItem(createCard(item));
  },
 },
 listElement
);

cardList.renderItems();

//Создание карточки

function createCard(item) {
 const card = new Card(item, templateItem, handleCardClick);
 const renderCard = card.render();
 return renderCard;
}

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
});

function openedPopupEdit() {
 const userData = userInfo.getUserInfo();
 profileNameInput.value = userData.name;
 profileAboutInput.value = userData.about;
 validFormPopupEdit.resetValidationState();
 popupFormEdit.open();
}

editButton.addEventListener('click', openedPopupEdit);

//Функция сохранения редактирования профиля

function submitForm(item) {
 //console.log(item);
 userInfo.setUserInfo(item);
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
 cardList.addItem(createCard(item));
 popupAddForm.close();
}
