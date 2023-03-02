class FormValidator {
    constructor(formElement) {
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(".popup__form-item"));
        this._buttonElement = formElement.querySelector(".popup__form-item_button");
    }

    _showError(inputElement, errorMessage, errorElement) {
        inputElement.classList.add("popup__form-item_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("popup__input-error_active");
    }

    _hideError(inputElement, errorElement) {
        inputElement.classList.remove("popup__form-item_type_error");
        errorElement.classList.remove("popup__input-error_active");
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage, errorElement);
        } else {
            this._hideError(inputElement, errorElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._toggleButtonState();
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}

export default FormValidator;