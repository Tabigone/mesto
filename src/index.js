import PopupWithImage from "../src/scripts/components/PopupWithImage.js";
import PopupWithForm from "../src/scripts/components/PopupWithForm.js";
import FormValidator from "../src/scripts/components/FormValidator.js";
import Card from "../src/scripts/components/Card.js";
import { validationSelectors, cardsArray } from "../src/scripts/utils/data.js";
import {editButton, addCardButton} from "../src/scripts/utils/constants.js";
import UserInfo from "../src/scripts/components/UserInfo.js";
import Section from "../src/scripts/components/Section.js";
import "/src/index.css";

const popupImage = new PopupWithImage(".popup_image");
function addNewCard(card) {
  const cards = new Card(
    card.name,
    card.link,
    "#element-template",
    popupImage.open.bind(popupImage)
  );
  return cards.generateCard();
}

const renderSection = new Section(
  {items: cardsArray, renderer: addNewCard},
  ".elements"
);
renderSection.renderItems();

const profileInfo = new UserInfo({nameSelector: ".profile__info-name", subtitleSelector: ".profile__info-subtitle"})
const  profileFormEdit = (info) => {
    profileInfo.setUserInfo(info);
}

const popupProfile = new PopupWithForm (".popup_profile", profileFormEdit)
editButton.addEventListener("click", () => {
popupProfile.open();
})

function addOneCard (card) {
  renderSection.addItem(addNewCard(card));
}

const popupCard = new PopupWithForm(".popup_cards", addOneCard);
addCardButton.addEventListener("click", () => {
  popupCard.open();
});

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const validator = new FormValidator(validationSelectors, formElement);
  validator.enableValidation();
});



