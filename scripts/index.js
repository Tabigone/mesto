import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {validationSelectors, cardsArray} from "./data.js";

const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__info-name");
const profileSubtitle = document.querySelector(".profile__info-subtitle");
const addCardButton = document.querySelector(".profile__add-button");
const blockElements = document.querySelector(".elements");
const popupProfileName = document.querySelector(".popup__form-item_name");
const popupProfileSubtitle = document.querySelector(".popup__form-item_subtitle");

const scrollController = {
    disabledScroll() {
        document.body.style.paddingRight = `${
            window.innerWidth - document.body.offsetWidth
        }px`;
        document.body.style.overflow = "hidden";
    },
    enabledScroll() {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "";
    },
};

function openPopup(popup) {
    popup.classList.add("popup_condition_opened");
    popup.classList.remove("popup_condition_hidden");
    scrollController.disabledScroll();
}

function closePopup(popup) {
    popup.classList.add("popup_condition_hidden");
    popup.classList.remove("popup_condition_opened");
    scrollController.enabledScroll();
}

const closeIconArray = Array.from(
    document.querySelectorAll(".popup__close-icon")
);
closeIconArray.forEach((closeIcon) => {
    closeIcon.addEventListener("click", function (evt) {
        closePopup(evt.target.closest(".popup"));
    });
});

function addProfileInfo() {
    profileName.innerText = popupProfileName.value;
    profileSubtitle.innerText = popupProfileSubtitle.value;
    closePopup(document.querySelector(".popup_profile"));
}

editButton.addEventListener("click", function () {
    openPopup(document.querySelector(".popup_profile"));
});

addCardButton.addEventListener("click", function () {
    openPopup(document.querySelector(".popup_cards"));
});

function addNewCard(card) {
        const renderedCard = new Card(card.name, card.link, "#element-template");
        const cardElement = renderedCard.generateCard();
        blockElements.prepend(cardElement);
    }

cardsArray.forEach((card) => {
    addNewCard(card);
})

const popupCardName = document.querySelector("#cards__name");
const popupCardsLink = document.querySelector("#cards__link");

document
    .querySelector("#card-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        addNewCard({name : popupCardName.value, link : popupCardsLink.value});
        popupCardsLink.value = "";
        popupCardName.value = "";
        closePopup(document.querySelector(".popup_cards"));
    });

document
    .querySelector("#profile-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        addProfileInfo();
    });

const popupCoverArray = Array.from(document.querySelectorAll(".popup__cover"));
popupCoverArray.forEach((cover) => {
    cover.addEventListener("click", function (evt) {
        closePopup(evt.target.closest(".popup"));
    });
});

const popupArray = Array.from(document.querySelectorAll(".popup"));
popupArray.forEach((popup) => {
    document.addEventListener("keydown", function (evt) {
        if (evt.code === "Escape") {
            closePopup(popup);
        }
    });
});

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
    const validator = new FormValidator(validationSelectors, formElement);
    validator.enableValidation();
});

export {openPopup};
