import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitCallback = submitCallback;
    this.setEventListeners();
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll(".popup__form-item"));
    const values = inputs.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    return values;
  }

  _handleSubmitCallback() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues())
      this.close();
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmitCallback();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
