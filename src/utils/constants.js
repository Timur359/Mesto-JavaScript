const editButton = document.querySelector('.profile__edit-button');
const profileNameInput = document.querySelector('.popup__input_data_name');
const profileAboutInput = document.querySelector('.popup__input_data_about');

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
 popupZoomSelector: '.popup_zoom',
 profileNameSelector: '.profile__name',
 profileAboutSelector: '.profile__about',
 inputNameSelector: '.popup__input_data_name',
 inputAboutSelector: '.popup__input_data_about',
};

const listElement = document.querySelector('.elements');
const templateItem = document.querySelector('#template').content;
const buttonAdd = document.querySelector('.profile__add-button');

export {
 editButton,
 validationObject,
 selectorObject,
 listElement,
 templateItem,
 buttonAdd,
 profileNameInput,
 profileAboutInput,
};
