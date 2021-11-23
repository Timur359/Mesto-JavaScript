//Добавление распределенных элементов

class CardsList {
 constructor(component, cards, createCard) {
  this._component = component;
  this._createCard = createCard;
 }

 addItem(item) {
  const card = this._createCard(item);
  const view = card.render();
  this._component.prepend(view);
 }
}

export default CardsList;
