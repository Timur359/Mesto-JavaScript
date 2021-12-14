export default class Api {
 constructor({ baseUrl, headers }) {
  this._baseUrl = baseUrl;
  this._userUrl = `${this._baseUrl}/users/me`;
  this._cardsUrl = `${this._baseUrl}/cards`;
  this._likesUrl = `${this._baseUrl}/cards/likes`;
  this._token = headers['authorization'];
 }

 //Получение информации о пользователе

 getUserData() {
  return fetch(this._userUrl, {
   headers: {
    authorization: this._token,
   },
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //Сохранение редактирования профиля

 saveUserChanges({ name, about }) {
  return fetch(this._userUrl, {
   method: 'PATCH',
   headers: {
    authorization: this._token,
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    name: name,
    about: about,
   }),
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //Получение массива карточек с сервера

 getInitialCards() {
  return fetch(this._cardsUrl, {
   headers: {
    authorization: this._token,
   },
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка:${res.status}`);
  });
 }

 //Добавление карточек на сервер

 postNewCard({ name, link }) {
  return fetch(this._cardsUrl, {
   method: 'POST',
   headers: {
    authorization: this._token,
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    name: name,
    link: link,
   }),
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //Удаление карточек

 deleteCard(cardId) {
  return fetch(`${this._cardsUrl}/${cardId}`, {
   method: 'DELETE',
   headers: {
    authorization: this._token,
   },
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //"Лайк" карточек

 likedCard(cardId) {
  return fetch(`${this._likesUrl}/${cardId}`, {
   method: 'PUT',
   headers: {
    authorization: this._token,
   },
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //Снятие "лайка"
 dislikedCard(cardId) {
  return fetch(`${this._likesUrl}/${cardId}`, {
   method: 'DELETE',
   headers: {
    authorization: this._token,
   },
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  });
 }

 //Обновление аватара

 changedAvatar(src) {
  return fetch(`${this._userUrl}/avatar`, {
   method: 'PATCH',
   headers: {
    authorization: this._token,
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    avatar: src.link,
   }),
  }).then((res) => {
   if (res.ok) {
    return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  });
 }
}
