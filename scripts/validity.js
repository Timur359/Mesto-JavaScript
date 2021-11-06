const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible',
};

//Функция отображения ошибки

function showError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

//Функция скрытия ошибки

function hideError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

//Функция проверки валидации form

function enableValidation(config) {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach((form) => setEventListeners(form, config));
}

//Функция обработчик значений в input

function setEventListeners(form, config) {
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', () => toggleButtonActive(form, config));
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  inputs.forEach((input) => {
    input.addEventListener('input', () =>
      checkInputValidity(input, form, config)
    );
  });
  toggleButtonActive(form, config);
}

//Функция скрытия кнопки

function toggleButtonActive(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

//Функция для отмены стандартного события браузера

function handleSubmit(event) {
  event.preventDefault();
}

//Функция отображения и скрытия ошибки

function checkInputValidity(input, form, config) {
  if (!input.validity.valid) {
    showError(input, form, config);
  } else {
    hideError(input, form, config);
  }
}

function resetInputError(form, config) {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  inputs.forEach((input) => hideError(input, form, config));
}

function abc(form, config) {
  resetInputError(form, config);
  toggleButtonActive(form, config);
}

enableValidation(validationConfig);
