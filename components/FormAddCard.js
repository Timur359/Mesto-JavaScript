class FormAddCard {
    constructor(form, addItem) {
        this._form = form;
        this._inputName = form.querySelector('.popup__input_place_name');
        this._inputLink = form.querySelector('.popup__input_place_url');
        this._addItem = addItem;
    }

    _addCard(event) {
        event.preventDefault();
        const name = this._inputName.value;
        const link = this._inputLink.value;
        const item = {
            name,
            link,
        };
        this._addItem(item);
        this._form.reset();
    }

    addListener() {
        this._form.addEventListener('submit', (event) => this._addCard(event));
    }
}

export default FormAddCard;