//Добавление распределенных элементов

export default class Section {
 constructor({ items, renderer }, component) {
  this._items = items;
  this._component = component;
  this._createCard = renderer;
 }

 renderItems() {
  this._items.forEach((item) => {
   this._createCard(item); //постараюсь добавить в следующей пр, уже голова не работает
  });
 }

 addItem(view) {
  this._component.prepend(view);
 }
}
