import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";
import User from "../scripts/components/User.js";
import Card from "../scripts/components/Card.js";
import Api from "../scripts/components/Api.js";
import { validationSelectors, request } from "../scripts/utils/data.js";
import {
  editButton,
  addCardButton,
  popupProfileName,
  popupProfileSubtitle,
  editAvatarButton,
  profileAvatar,
} from "../scripts/utils/constants.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Section from "../scripts/components/Section.js";
import "./index.css";

export const api = new Api(request)
export const user = new User(api)

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  subtitleSelector: ".profile__info-subtitle",
});

user.promise.then(() => {
  profileAvatar.src = user.avatar;
  userInfo.setUserInfo(user)
})


const profileFormEdit = (info) => {
  api.setUserInfo(info)
  .then((res) => {
     userInfo.setUserInfo(res);
  })
  .catch((err) => {
    alert(`Что-то пошло не так. Ошибка: ${(err.status)}`);
  })
};

const popupImage = new PopupWithImage(".popup_image");
function addNewCard(card) {
  const cards = new Card(
    card,
    "#element-template",
    popupImage.open.bind(popupImage),
    user
  );
  return cards.generateCard();
}

const renderCards = () => {
  api.getInitialCards()
    .then((res) => {
      res.reverse();
      const renderSection = new Section(
        { items: res, renderer: addNewCard },
        ".elements"
      );
      renderSection.renderItems();
    }) 
}

renderCards();

const popupProfile = new PopupWithForm(".popup_profile", profileFormEdit);
editButton.addEventListener("click", () => {
  const { name, subtitle } = userInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileSubtitle.value = subtitle;
  const inputEvent = new Event("input");
  popupProfileName.dispatchEvent(inputEvent);
  popupProfileSubtitle.dispatchEvent(inputEvent);
  popupProfile.open();
});

function addOneCard(card) {
  api.createCard(card)
  .then((res) => {
    const renderSection = new Section(
      { items: res, renderer: addNewCard },
      ".elements"
    );
    renderSection.addItem(addNewCard(card));
  })
   .catch((err) => {
      alert(`Что-то пошло не так. Ошибка: ${(err.status)}`);
   })
}

const popupCard = new PopupWithForm(".popup_cards", addOneCard);
addCardButton.addEventListener("click", () => {
  popupCard.open();
});

const getAvatarLink = (data) => {
  api.setProfileAvatar(data)
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .catch((err) => {
      alert(`Что-то пошло не так. Ошибка: ${(err.status)}`);
    });
};

const avatarEditor = new PopupWithForm(".popup_avatar-edit", getAvatarLink);
editAvatarButton.addEventListener("click", () => {
  avatarEditor.open();
});

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const validator = new FormValidator(validationSelectors, formElement);
  validator.enableValidation();
});
