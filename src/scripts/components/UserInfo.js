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

  setUserInfo({ name, subtitle }) {
    this._nameElement.textContent = name;
    this._subtitleElement.textContent = subtitle;
  }
}
