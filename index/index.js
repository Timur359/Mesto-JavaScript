const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const formButton = document.querySelector('.popup__button');
const form = document.querySelector('.popup__form');
const nameField = document.querySelector('.popup__input_data_name');
const profileName = document.querySelector('.profile__name');
const aboutField = document.querySelector('.popup__input_data_about');
const profileAbout = document.querySelector('.profile__about');



function openPopup() {
    popup.classList.add('popup_open'); 
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
}

function closePopup() {
    popup.classList.remove('popup_open'); 
}

editButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;
    closePopup();
}

form.addEventListener('submit', submitForm);



