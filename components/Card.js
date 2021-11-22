//Фукнционал карточки

class Card {
    constructor(item, template, openPopupZoom) {
        this._item = item;
        this._view = template.querySelector('.element').cloneNode(true);
        this._openPopupZoom = openPopupZoom;
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
        this._view
            .querySelector('.element__image')
            .addEventListener('click', (card) => {
                this._openPopupZoom(this);
                const imageZoom = document.querySelector('.popup__image');
                const altZoom = document.querySelector('.popup__figcaption');
                imageZoom.src = card.target.src;
                imageZoom.alt = this._item.name;
                altZoom.textContent = this._item.name;
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
        this._view.querySelector('.element__image').src = this._item.link;
        this._addListeners();
        return this._view;
    }
}

export default Card;