const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__form-item");

const showError = (inputElement, errorMessage, errorElement) => {
	inputElement.classList.add("popup__form-item_type_error");
	errorElement.textContent = errorMessage;
	errorElement.classList.add("popup__input-error_active");
  };

const hideError = (inputElement, errorElement) => {
	inputElement.classList.remove("popup__form-item_type_error");
	errorElement.classList.remove('popup__input-error_active');
	errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	if (!inputElement.validity.valid) {
		showError(inputElement, inputElement.validationMessage, errorElement)
  	} else {
    	hideError(inputElement, errorElement)
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
	formElement.addEventListener("submit", function () {
		toggleButtonState(inputList, buttonElement);
	});
	toggleButtonState(inputList, buttonElement);
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

enableValidation();