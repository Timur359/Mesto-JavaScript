//Константы

const bigPage = document.querySelector('.page');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const listElements = document.querySelector('.elements');
const initialCardsList = document.querySelector('#template').content;

const popupSet = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit');
const formEdit = document.querySelector('.popup__form_edit');
const placeName = document.querySelector('.popup__input_place_name');
const placeUrl = document.querySelector('.popup__input_place_url');
const popupCloseButtonEdit = document.querySelector('.popup__close_edit');

const popupAdd = document.querySelector('.popup_add');
const formAdd = document.querySelector('.popup__form_add');
const nameField = document.querySelector('.popup__input_data_name');
const aboutField = document.querySelector('.popup__input_data_about');
const popupCloseButtonAdd = document.querySelector('.popup__close_add');

const popupZoom = document.querySelector('.popup_zoom');
const buttonClosePopupZoom = document.querySelector('.popup__close_zoom');

const keyEscape = 27;

//Функции открытия и закрытия popup

function openPopup(popup) {
    popup.classList.add('popup_open');
    enableValidation(config);
}

function closePopup(popup) {
    popup.classList.remove('popup_open');
}

//Функции обработки изменений профиля

function openedPopupEdit() {
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
    openPopup(popupEdit);
}

editButton.addEventListener('click', openedPopupEdit);

popupCloseButtonEdit.addEventListener('click', () => {
    closePopup(popupEdit);
});

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;
    closePopup(popupEdit);
}

formEdit.addEventListener('submit', submitForm);

//Функции обработки добавления, приближения и удаления карточек

addButton.addEventListener('click', () => {
    placeUrl.value = '';
    placeName.value = '';
    openPopup(popupAdd);
});

popupCloseButtonAdd.addEventListener('click', () => {
    closePopup(popupAdd);
});

function addCardButton(card) {
    card.preventDefault();
    const name = placeName.value;
    const link = placeUrl.value;
    const alt = placeName.value;
    const item = {
        name: name,
        link: link,
        name: alt,
    };
    addInitialCards(item);
    closePopup(popupAdd);
}

formAdd.addEventListener('submit', addCardButton);

buttonClosePopupZoom.addEventListener('click', () => {
    closePopup(popupZoom);
});

initialCards.forEach(addInitialCards);

function createElement(item) {
    const elementList = initialCardsList
        .querySelector('.element')
        .cloneNode(true);
    elementList.querySelector('.element__text').textContent = item.name;
    elementList.querySelector('.element__image').src = item.link;
    elementList.querySelector('.element__image').alt = item.name;
    elementList
        .querySelector('.element__button_delete')
        .addEventListener('click', (card) => {
            card.target.closest('.element').remove();
        });
    elementList
        .querySelector('.element__button_like')
        .addEventListener('click', (card) => {
            card.target.classList.toggle('element__button_like_active');
        });
    const imageZoom = document.querySelector('.popup__image');
    const altZoom = document.querySelector('.popup__figcaption');
    elementList
        .querySelector('.element__image')
        .addEventListener('click', (card) => {
            openPopup(popupZoom);
            imageZoom.src = card.target.src;
            imageZoom.alt = card.target.alt;
            altZoom.textContent = card.target.alt;
        });
    return elementList;
}

function addInitialCards(item) {
    const elementList = createElement(item);
    listElements.prepend(elementList);
}

//Функции закрытия popup окна

function closePopupClick(popupSet) {
    popupSet.forEach((item) => {
        item
            .querySelector('.popup__overlay')
            .addEventListener('click', function(evt) {
                closePopup(item);
            });
    });
}

closePopupClick(popupSet);

function closePopupEsc(popupSet) {
    popupSet.forEach((item) => {
        bigPage.addEventListener('keydown', function(evt) {
            if (evt.keyCode === keyEscape) {
                closePopup(item);
            }
        });
    });
}

closePopupEsc(popupSet);

enableValidation(config);