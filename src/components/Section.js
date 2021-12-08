//Добавление распределенных элементов

export default class Section {
 constructor({ items, renderer }, component) {
  this._items = items;
  this._component = component;
  this._createCard = renderer;
 }

 renderItems() {
  this._items.forEach((item) => {
   this._createCard(item);
  });
 }

 addItem(view) {
  /*const card = this._createCard(item);
  const view = card.render();*/
  this._component.prepend(view);
 }
}
