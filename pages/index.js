const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const formButton = document.querySelector('.popup__button');
const formEdit = document.querySelector('.popup__form_edit');
const nameField = document.querySelector('.popup__input_data_name');
const profileName = document.querySelector('.profile__name');
const aboutField = document.querySelector('.popup__input_data_about');
const profileAbout = document.querySelector('.profile__about');

const popupCloseButtonEdit = document.querySelector('.popup__close_edit');
const popupEdit = document.querySelector('.popup_edit');

const popupCloseButtonAdd = document.querySelector('.popup__close_add');
const popupAdd = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__add-button');

const cardElementsList = document.querySelector('.elements');
const placeName = document.querySelector('.popup__input_place_name');
const placeUrl = document.querySelector('.popup__input_place_url')
const formAdd = document.querySelector('.popup__form_add');

const popupZoom = document.querySelector('.popup_zoom');
const buttonClosePopupZoom = document.querySelector('.popup__close_zoom');


const listElements = document.querySelector('.elements');
const initialCardsList = document.querySelector('#template').content;


///


function openPopup(popup) {
    popup.classList.add('popup_open');
}

function closePopup(popup) {
    popup.classList.remove('popup_open');
}



function openPopupEdit() {
    openPopup(popupEdit);
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
}

editButton.addEventListener('click', openPopupEdit);

popupCloseButtonEdit.addEventListener('click', () => {
    closePopup(popupEdit)
});

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;
    closePopup(popupEdit);
}

formEdit.addEventListener('submit', submitForm);


///


addButton.addEventListener('click', () => {
    openPopup(popupAdd)
    placeUrl.value = '';
    placeName.value = '';
});

popupCloseButtonAdd.addEventListener('click', () => {
    closePopup(popupAdd)
});


function addCardButton(card) {
    card.preventDefault();
    const name = placeName.value;
    const link = placeUrl.value;
    const alt = placeName.value
    const item = {
        name: name,
        link: link,
        name: alt,
    }
    addInitialCards(item);
    closePopup(popupAdd);

};

formAdd.addEventListener('submit', addCardButton);


///


buttonClosePopupZoom.addEventListener('click', () => {
    closePopup(popupZoom)
});



initialCards.forEach(addInitialCards);


function createElement(item) {
    const elementList = initialCardsList.querySelector('.element').cloneNode(true);
    elementList.querySelector('.element__text').textContent = item.name;
    elementList.querySelector('.element__image').src = item.link;
    elementList.querySelector('.element__image').alt = item.name;
    elementList.querySelector('.element__button_delete').addEventListener('click', (card) => {
        card.target.closest('.element').remove()
    });
    elementList.querySelector('.element__button_like').addEventListener('click', (card) => {
        card.target.classList.toggle('element__button_like_active');
    })
    const imageZoom = document.querySelector('.popup__image');
    const altZoom = document.querySelector('.popup__figcaption');
    elementList.querySelector('.element__image').addEventListener('click', (card) => {
        openPopup(popupZoom)
        imageZoom.src = card.target.src;
        altZoom.textContent = card.target.alt;

    })
    return elementList;
}

function addInitialCards(item) {
    const elementList = createElement(item);
    listElements.prepend(elementList);
}


/*function addCardButton(card) {
    card.preventDefault();
    const cardElement = cardElementsList.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__image').src = placeUrl.value;
    cardElement.querySelector('.element__text').textContent = placeName.value;

    cardElementsList.prepend(cardElement);
    closePopup(popupAdd);
    
};

formAdd.addEventListener('submit', addCardButton);*/