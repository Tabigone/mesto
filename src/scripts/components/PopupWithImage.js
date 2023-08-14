import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__fullsize-image");
    this._popupSubtitle = this._popup.querySelector(".popup__card-name");
    super.setEventListeners();
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}
