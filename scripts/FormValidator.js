//CДЕЛАТЬ В ВЕТКЕ!!!!! 16-17

class FormValidator {
    constructor(validationSelectors, formElement) {
        this._formElement = formElement;
        this._inputSelector = validationSelectors.inputSelector;
        this._submitButtonSelector = validationSelectors.submitButtonSelector;
        this._inputErrorClass = validationSelectors.inputErrorClass;
        this._errorClass = validationSelectors.errorClass; 
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    };

    _showError(inputElement, errorMessage, errorElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError(inputElement, errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
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

    _setValidation() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
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
        this._setValidation();
    }
}

export default FormValidator;
//CДЕЛАТЬ В ВЕТКЕ!!!!!