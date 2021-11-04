//Функция отображения ошибки

function showError(inputPopup, formPopup, config) {
    const errorElement = formPopup.querySelector(`#${inputPopup.id}-error`);
    inputPopup.classList.add(config.inputErrorClass);
    errorElement.textContent = inputPopup.validationMessage;
}

//Функция скрытия ошибки

function hideError(inputPopup, formPopup, config) {
    const errorElement = formPopup.querySelector(`#${inputPopup.id}-error`);
    inputPopup.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

//Функция проверки валидации form

function enableValidation(meaningConfig) {
    const forms = [...document.querySelectorAll(meaningConfig.formSelector)];
    forms.forEach((formPopup) => setEventListeners(formPopup, meaningConfig));
}

//Функция обработчик значений в input

function setEventListeners(formPopup, config) {
    formPopup.addEventListener('submit', handleSubmit);
    formPopup.addEventListener('input', () =>
        setSubmitButtonState(formPopup, config)
    );
    const inputs = [...formPopup.querySelectorAll(config.inputSelector)];
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () =>
            checkInputValidity(inputElement, formPopup, config)
        );
    });
    setSubmitButtonState(formPopup, config);
}

//Функция скрытия кнопки

function setSubmitButtonState(formPopup, config) {
    const button = formPopup.querySelector(config.submitButtonSelector);
    button.disabled = !formPopup.checkValidity();
    button.classList.toggle(
        config.inactiveButtonClass, !formPopup.checkValidity()
    );
}

//Функция для отмены стандартного события браузера

function handleSubmit(event) {
    event.preventDefault();
}

//Функция отображения и скрытия ошибки

function checkInputValidity(inputPopup, formPopup, config) {
    if (!inputPopup.validity.valid) {
        showError(inputPopup, formPopup, config);
    } else {
        hideError(inputPopup, formPopup, config);
    }
}

enableValidation(config);