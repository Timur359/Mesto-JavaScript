import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
 constructor(component, handleSubmit) {
  super(component);
  this._handleSubmit = handleSubmit;
  this._popupForm = this._component.querySelector('.popup__form');
  this._inputList = this._component.querySelectorAll('.popup__input');
  this._button = this._popupForm.querySelector('.popup__button');
 }

 close() {
  super.close();
  this._popupForm.reset();
 }

 // метод, который собирает данные всех полей формы
 _getInputValues() {
  this._formValues = {};

  this._inputList.forEach((input) => {
   this._formValues[input.name] = input.value;
  });

  return this._formValues;
 }

 setEventListeners() {
  super.setEventListeners();
  this._popupForm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   this._handleSubmit(this._getInputValues());
  });
 }
}
