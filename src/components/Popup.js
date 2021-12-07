export default class Popup {
 constructor(component) {
  this._component = component;
  //this._popupElement = document.querySelector(this._popupSelector);
  this._popupCloseButton = this._component.querySelector('.popup__close');
  this._handleEscClose = this._handleEscClose.bind(this);
 }
 open() {
  this._component.classList.add('popup_open');
  document.addEventListener('keydown', this._handleEscClose);
 }

 close() {
  this._component.classList.remove('popup_open');
  document.addEventListener('keydown', this._handleEscClose);
 }

 _handleEscClose(evt) {
  if (evt.key === 'Escape') {
   this.close();
  }
 }

 _handlePopupClick(evt) {
  if (evt.target.classList.contains('popup__overlay')) {
   this.close();
  }
 }

 setEventListeners() {
  this._popupCloseButton.addEventListener('click', () => this.close());
  this._component.addEventListener('mousedown', (evt) =>
   this._handlePopupClick(evt)
  );
 }
}
