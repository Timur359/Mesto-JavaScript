class Popup {
    constructor(config, component) {
        this._config = config;
        this._component = component;
        this._popupCloseButton = this._component.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._component.classList.add(this._config.popupOpenClassName);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._component.classList.remove(this._config.popupOpenClassName);
        document.addEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => this.close());
    }
}

export default Popup;