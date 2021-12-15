import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import {
 editButton,
 validationObject,
 selectorObject,
 listElement,
 templateItem,
 buttonAdd,
 profileNameInput,
 profileAboutInput,
 buttonChangeAvatar,
} from '../utils/constants.js';

//Валидация для попап аватара

const validFormPopupChangeAvatar = new FormValidator(
 validationObject,
 selectorObject.popupAvatarSelector
);
validFormPopupChangeAvatar.enableValidation();

//Слушатель на кнопку изменения аватара

buttonChangeAvatar.addEventListener('click', () => {
 popupFormChangeAvatar.open();
 validFormPopupChangeAvatar.resetValidationState();
});

//Открытие попапа для обновления карточки

const popupFormChangeAvatar = new PopupWithForm(
 selectorObject.popupAvatarSelector,
 handlePopupChangeAvatar
);
popupFormChangeAvatar.setEventListeners();

//Функция редактирования аватара при нажатии на сабмит

function handlePopupChangeAvatar(inputsData) {
 popupFormChangeAvatar.renderSaving(true);

 api
  .changedAvatar(inputsData)
  .then((data) => {
   userInfo.setUserInfo(data);
   popupFormChangeAvatar.close();
  })
  .catch((err) => {
   console.log(err);
  })
  .finally(() => {
   popupFormChangeAvatar.renderSaving(false);
  });
}

//Добавление массива

const cardList = new Section(
 {
  renderer: (cardItem, id) => {
   cardList.addItem(createCard(cardItem, id));
  },
 },

 listElement
);

//Создание карточки

function createCard(item, id) {
 const card = new Card(
  item,
  templateItem,
  handleCardClick,
  handleTrashClick,
  handleLikeClick,
  id
 );
 const renderCard = card.render();
 return renderCard;
}

function handleCardClick(title, link) {
 popupImageZoom.open(title, link);
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

//ОБРАБОТКА ПРОФИЛЯ

const popupFormEdit = new PopupWithForm(
 selectorObject.popupProfileSelector,
 handlePopupProfile
);
popupFormEdit.setEventListeners();

const userInfo = new UserInfo({
 selectorName: selectorObject.profileNameSelector,
 selectorAbout: selectorObject.profileAboutSelector,
 selectorAvatar: selectorObject.profileAvatarSelector,
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

function handlePopupProfile(inputsData) {
 popupFormEdit.renderSaving(true);

 api
  .saveUserChanges(inputsData)
  .then((data) => {
   userInfo.setUserInfo(data);
   popupFormEdit.close();
  })
  .catch((err) => {
   console.log(err);
  })
  .finally(() => {
   popupFormEdit.renderSaving(false);
  });
}

//ОБРАБОТКА ЗУМА

const popupImageZoom = new PopupWithImage(selectorObject.popupZoomSelector);
popupImageZoom.setEventListeners();

//ОБРАБОТКА ДОБАВЛЕНИЯ КАРТОЧЕК

const popupAddForm = new PopupWithForm(
 selectorObject.popupAddCardSelector,
 handlePopupAddCard
);
popupAddForm.setEventListeners();

//Кнопка добавления карточки

buttonAdd.addEventListener('click', () => {
 popupAddForm.open();
 validFormPopupAddCard.resetValidationState();
});

function handlePopupAddCard(inputsData) {
 popupAddForm.renderSaving(true);

 api
  .postNewCard(inputsData)
  .then((data) => {
   cardList.addItemPrepend(createCard(data, data.owner._id));
   popupAddForm.close();
  })
  .catch((err) => {
   console.log(err);
  })
  .finally(() => {
   popupAddForm.renderSaving(false);
  });
}

const api = new Api({
 baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
 headers: {
  authorization: '83e879e9-0475-4904-b282-74d56e03a778',
  'Content-Type': 'application/json',
 },
});

Promise.all([api.getUserData(), api.getInitialCards()])
 .then((values) => {
  userInfo.setUserInfo(values[0]);
  cardList.renderItems(values[1], values[0]._id);
 })
 .catch((err) => {
  console.log(err);
 });

function handleTrashClick(id, card) {
 popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card));
 popupWithConfirm.open();
}

const popupWithConfirm = new PopupWithConfirm(
 selectorObject.popupConfirmSelector
);
popupWithConfirm.setEventListeners();

function handlePopupConfirm(id, card) {
 api
  .deleteCard(id)
  .then(() => {
   card.remove();
   popupWithConfirm.close();
  })
  .catch((err) => {
   console.log(err);
  });
}

function handleLikeClick(id, isLiked, card) {
 if (isLiked) {
  //отправляем запрос снятия лайка
  api
   .dislikedCard(id)
   .then((data) => {
    card.setLikes(data.likes);
   })
   .catch((err) => {
    console.log(err);
   });
 } else {
  //отправляем запрос на установку лайка
  api
   .likedCard(id)
   .then((data) => {
    card.setLikes(data.likes);
   })
   .catch((err) => {
    console.log(err);
   });
 }
}
