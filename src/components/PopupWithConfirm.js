import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
 constructor(popupSelector) {
  super(popupSelector);
  this._buttonConfirm = this._popup.querySelector('.popup__form');
 }

 setSubmitAction(submitAction) {
  this._handleSubmitCallback = submitAction;
 }

 // дополнительно добавляем обработчик клика подтверждения
 setEventListeners() {
  super.setEventListeners();
  this._buttonConfirm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   this._handleSubmitCallback();
  });
 }
}

function handlePopupConfirm(id, card) {
 api
  .deleteCard(id)
  .then(() => {
   card.removeCard();
   popupWithConfirm.close();
  })
  .catch((err) => {
   console.log(err);
  });
}
