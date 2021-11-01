const showError = (formElement, formInput, errorMessage) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add('popup__input_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__error_visible');
}


const hideError = (formElement, formInput) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__error_visible');
    formError.textContent = '';
}

const checkInputValidity = (formElement, formInput) => {
    if (!formInput.validity.valid) {
        showError(formElement, formInput, formInput.validationMessage);
    } else {
        hideError(formElement, formInput);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button')
    toggleButtonActive(inputList, buttonElement);
    inputList.forEach((formInput)=> {
        formInput.addEventListener('input', function() {
            checkInputValidity(formElement, formInput);
            toggleButtonActive(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement)=> {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};


const invalidInput = (inputList) => {
    return inputList.some((formInput) => {
        return !formInput.validity.valid;
    });
};

const toggleButtonActive = (inputList, buttonElement) => {
    if (invalidInput(inputList)) {
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.classList.remove('popup__button_disabled');
    }
}

enableValidation();
