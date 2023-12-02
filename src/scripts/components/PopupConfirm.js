import Popup from "./Popup.js";
import { api } from "../../pages/index.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, deleteButton, card) {
    super(popupSelector)
    this._deleteButton = deleteButton;
    this._form = this._popup.querySelector(".popup__form");
    this._card = card;
    this._cardId = card._id;
    this.setEventListeners()
  }

  setEventListeners() {
    super.setEventListeners()
    const confButton = this._form.querySelector(".popup__form-item_button")
    confButton.addEventListener("click", () => {
      api.deleteCard(this._cardId);
      this._deleteButton.closest(".element").remove()
      this.close();
    })
  }
}
