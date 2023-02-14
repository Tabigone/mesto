const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__form-item");
const formError = form.querySelector(`.${formInput.id}-error`);
const cardForm = document.querySelector("#card-form");
const cardInputList = Array.from(cardForm.querySelectorAll(".popup__form-item"));
const cardButton = cardForm.querySelector(".popup__cards-item_button");

const showError = (formElement, inputElement, errorMessage, errorElement) => {
	inputElement.classList.add("popup__form-item_type_error");
	errorElement.textContent = errorMessage;
	errorElement.classList.add("popup__input-error_active");
  };

const hideError = (formElement, inputElement, errorElement) => {
	inputElement.classList.remove("popup__form-item_type_error");
	errorElement.classList.remove('popup__input-error_active');
	errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	if (!inputElement.validity.valid) {
		showError(formElement, inputElement, inputElement.validationMessage, errorElement)
  	} else {
    	hideError(formElement, inputElement, errorElement)
  	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid
	})
}

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.setAttribute("disabled", true)
	} else {
		buttonElement.removeAttribute("disabled")
	}
}

const setEventListener = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(".popup__form-item"));
	const buttonElement = formElement.querySelector(".popup__form-item_button");
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", function () {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		})
	})
};

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll(".popup__form"));
	formList.forEach((formElement) => {
	  	setEventListener(formElement);
	})
};

toggleButtonState(cardInputList, cardButton);

enableValidation();