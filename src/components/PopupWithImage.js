import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
 constructor(component) {
  super(component);
  this._popupTitle = this._component.querySelector('.popup__figcaption');
  this._popupPhoto = this._component.querySelector('.popup__image');
 }

 open(title, link) {
  super.open();
  this._popupTitle.textContent = title;
  this._popupPhoto.src = link;
  this._popupPhoto.alt = `Фото ${title}`;
 }
}
