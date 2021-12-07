export default class UserInfo {
 constructor({ selectorName, selectorAbout, inputName, inputAbout }) {
  this._profileName = document.querySelector(selectorName);
  this._profileAbout = document.querySelector(selectorAbout);
  this._inputName = document.querySelector(inputName);
  this._inputAbout = document.querySelector(inputAbout);
 }

 //метод который возвращает объект с данными пользователя
 getUserInfo() {
  this._inputName.value = this._profileName.textContent;
  this._inputAbout.value = this._profileAbout.textContent;
 }

 //метод который принимает новые данные пользователя и добавляет их на страницу
 setUserInfo() {
  this._profileName.textContent = this._inputName.value;
  this._profileAbout.textContent = this._inputAbout.value;
 }
}
