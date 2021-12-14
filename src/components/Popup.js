export default class Popup {
 constructor(popupSelector) {
  this._popupSelector = popupSelector;
  this._popup = document.querySelector(this._popupSelector);
  this._popupCloseButton = this._popup.querySelector('.popup__close');
  this._handleEscClose = this._handleEscClose.bind(this);
 }
 open() {
  this._popup.classList.add('popup_open');
  document.addEventListener('keydown', this._handleEscClose);
 }

 close() {
  this._popup.classList.remove('popup_open');
  document.removeEventListener('keydown', this._handleEscClose);
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
  this._popup.addEventListener('mousedown', (evt) =>
   this._handlePopupClick(evt)
  );
 }
}
