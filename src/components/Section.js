//Добавление распределенных элементов

export default class Section {
 constructor({ renderer }, component) {
  this._component = component;
  this._createCard = renderer;
 }

 renderItems(arr, id) {
  arr.forEach((item) => {
   this._createCard(item, id);
  });
 }

 addItem(element) {
  this._component.append(element);
 }

 addItemPrepend(element) {
  this._component.prepend(element);
 }
}
