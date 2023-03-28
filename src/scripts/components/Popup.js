export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.code === "Escape") {
      this.close();
    }
  }

  _disableScroll() {
    document.body.style.paddingRight = `${
      window.innerWidth - document.body.offsetWidth
    }px`;
    document.body.style.overflow = "hidden";
  }

  _enableScroll() {
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";
  }

  open() {
    this._popup.classList.add("popup_condition_opened");
    this._popup.classList.remove("popup_condition_hidden");
    this._disableScroll();
  }

  close() {
    this._popup.classList.remove("popup_condition_opened");
    this._popup.classList.add("popup_condition_hidden");
    this._enableScroll();
  }

  setEventListeners() {
    this._popup.querySelector(".popup__cover").addEventListener("click", () => {
      this.close();
    });
    this._popup
      .querySelector(".popup__close-icon")
      .addEventListener("click", () => {
        this.close();
      });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
