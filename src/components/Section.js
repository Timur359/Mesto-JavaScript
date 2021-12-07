//Добавление распределенных элементов

export default class Section {
 constructor({ items, renderer }, component) {
  this._component = component;
  this._createCard = renderer;
 }

 addItem(item) {
  const card = this._createCard(item);
  const view = card.render();
  this._component.prepend(view);
 }
}
