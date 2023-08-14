export default class UserInfo {
  constructor({ nameSelector, subtitleSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      subtitle: this._subtitleElement.textContent,
    };
  }

  setUserInfo(user) {
    this._nameElement.textContent = user.name;
    this._subtitleElement.textContent = user.about;
  }
}
