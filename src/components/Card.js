//Фукнционал карточки

export default class Card {
 constructor(
  item,
  template,
  handleCardClick,
  handleTrashClick,
  handleLikeClick,
  userId
 ) {
  this._item = item;
  this._view = template.querySelector('.element').cloneNode(true);
  this._handleCardClick = handleCardClick;
  this._name = item.name;
  this._link = item.link;
  this._cardImage = this._view.querySelector('.element__image');
  this._handleTrashClick = handleTrashClick;
  this._idOwner = item.owner._id;
  this._userId = userId;
  this._cardId = item._id;
  this._likes = item.likes;
  this._handleLikeClick = handleLikeClick;
 }

 //Удаление карточки

 remove() {
  this._view.remove();
 }

 //Отображение лайков

 setLikes(arr) {
  this._view.querySelector('.element__sum-like').textContent = arr.length;
  this._likes = arr;
  if (this._checkLike()) {
   this._like.classList.add('element__button_like_active');
  } else {
   this._like.classList.remove('element__button_like_active');
  }
 }

 //Приближение карточки

 _zoom() {
  this._cardImage.addEventListener('click', () => {
   this._handleCardClick(this._name, this._link);
  });
 }

 _addListeners() {
  this._delete.addEventListener('click', () => {
   this._handleTrashClick(this._cardId, this);
  });
  this._like.addEventListener('click', () => {
   this._handleLikeClick(this._cardId, this._checkLike(), this);
  });
  this._zoom();
 }

 //Распределение элементов по классам

 render() {
  this._view.querySelector('.element__text').textContent = this._item.name;
  this._cardImage.src = this._item.link;
  this._cardImage.alt = this._item.name;
  this._delete = this._view.querySelector('.element__button_delete');
  this._like = this._view.querySelector('.element__button_like');
  //Отображение корзины только на карточках, которые добавил пользователь
  if (this._userId !== this._idOwner) {
   this._delete.remove();
  }
  this.setLikes(this._likes);
  this._addListeners();
  return this._view;
 }

 _checkLike() {
  return this._likes.some((like) => {
   return like._id === this._userId;
  });
 }
}
