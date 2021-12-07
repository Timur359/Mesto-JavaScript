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

const listElement = document.querySelector('.elements');
const templateItem = document.querySelector('#template').content;
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');

export {
 editButton,
 popupEdit,
 popupZoom,
 validationObject,
 selectorObject,
 listElement,
 templateItem,
 popupAdd,
 buttonAdd,
};
