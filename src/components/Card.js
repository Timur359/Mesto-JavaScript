//Фукнционал карточки

export default class Card {
 constructor(item, template, handleCardClick) {
  this._item = item;
  this._view = template.querySelector('.element').cloneNode(true);
  this._handleCardClick = handleCardClick;
  this._name = item.name;
  this._link = item.link;
  this._cardImage = this._view.querySelector('.element__image');
 }

 //Удаление карточки

 _remove() {
  this._view.remove();
 }

 //Кнопка "Лайк"

 _like() {
  this._view
   .querySelector('.element__button_like')
   .addEventListener('click', (event) => {
    event.target.classList.toggle('element__button_like_active');
   });
 }

 //Приближение карточки

 _zoom() {
  this._cardImage.addEventListener('click', () => {
   this._handleCardClick(this._name, this._link);
  });
 }

 _addListeners() {
  this._view
   .querySelector('.element__button_delete')
   .addEventListener('click', () => this._remove());
  this._like();
  this._zoom();
 }

 //Распределение элементов по классам

 render() {
  this._view.querySelector('.element__text').textContent = this._item.name;
  this._cardImage.src = this._item.link;
  this._cardImage.alt = this._item.name;
  this._addListeners();
  return this._view;
 }
}
