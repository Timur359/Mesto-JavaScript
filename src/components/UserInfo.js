export default class UserInfo {
 constructor({ selectorName, selectorAbout }) {
  this._profileName = document.querySelector(selectorName);
  this._profileAbout = document.querySelector(selectorAbout);
 }

 //метод который возвращает объект с данными пользователя
 getUserInfo() {
  this._profileData = {
   name: this._profileName.textContent,
   about: this._profileAbout.textContent,
  };
  return this._profileData;
 }

 //метод который принимает новые данные пользователя и добавляет их на страницу
 setUserInfo({ name, about }) {
  this._profileName.textContent = name;
  this._profileAbout.textContent = about;
 }
}
