export default class Popup {
 constructor(popupSelector) {
  this._popupSelector = popupSelector;
  //this._popupElement = document.querySelector(this._popupSelector);
  this._popupCloseButton = this._popupSelector.querySelector('.popup__close');
  this._handleEscClose = this._handleEscClose.bind(this);
 }
 open() {
  this._popupSelector.classList.add('popup_open');
  document.addEventListener('keydown', this._handleEscClose);
 }

 close() {
  this._popupSelector.classList.remove('popup_open');
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
  this._popupSelector.addEventListener('mousedown', (evt) =>
   this._handlePopupClick(evt)
  );
 }
}
