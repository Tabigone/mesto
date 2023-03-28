import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import FormValidator from "./scripts/components/FormValidator.js";
import Card from "./scripts/components/Card.js";
import { validationSelectors, cardsArray } from "./scripts/utils/data.js";
import {
  editButton,
  addCardButton,
  popupProfileName,
  popupProfileSubtitle,
  profileForm,
  cardForm,
} from "./scripts/utils/constants.js";
import UserInfo from "./scripts/components/UserInfo.js";
import Section from "./scripts/components/Section.js";
import "./index.css";

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
  { items: cardsArray, renderer: addNewCard },
  ".elements"
);
renderSection.renderItems();

const profileInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  subtitleSelector: ".profile__info-subtitle",
});
const profileFormEdit = (info) => {
  profileInfo.setUserInfo(info);
};

const popupProfile = new PopupWithForm(".popup_profile", profileFormEdit);
editButton.addEventListener("click", () => {
  const { name, subtitle } = profileInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileSubtitle.value = subtitle;
  const validator = new FormValidator(validationSelectors, profileForm);
  validator.enableValidation();
  popupProfile.open();
});

function addOneCard(card) {
  renderSection.addItem(addNewCard(card));
}

const popupCard = new PopupWithForm(".popup_cards", addOneCard);
addCardButton.addEventListener("click", () => {
  const validator = new FormValidator(validationSelectors, cardForm);
  validator.enableValidation();
  popupCard.open();
});
