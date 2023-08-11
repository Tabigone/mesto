const validationSelectors = {
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__form-item_button",
  inputErrorClass: "popup__input-error_active",
  errorClass: "popup__input-error_active",
};

const request = { 
  serverLink: "https://mesto.nomoreparties.co/v1/cohort-12", 
  headers: { 
    authorization: "10d0cab2-3de3-42ea-80c8-2e15574d2bdb", 
    "Content-Type": "application/json", 
  }, 
}

export { validationSelectors, request };
