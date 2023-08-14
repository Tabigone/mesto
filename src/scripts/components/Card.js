import PopupConfirm from "./PopupConfirm.js";
import { api } from "../../pages/index.js";

export default class Card {
  constructor(cardData, templateSelector, handleCardClick, user) { 
    this._card = cardData;
    this._cardId = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._user = user;
    this._hasLiked = cardData.likes.some(like => like._id == user._id);
    this._isOwner = cardData.owner._id == user._id;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector(".element").cloneNode(true);
  }

  
  _handleLikeCard(event) {
    const likeCounterElement = event.target.closest(".element__like-container").querySelector(".element__like-counter"); 
    if (!this._hasLiked) {
      api.setLike(this._cardId)
        .then((res) => {
          event.target.closest(".element__like").classList.toggle("element__like_active")
          likeCounterElement.innerHTML = res.likes.length
          this._hasLiked = true
        })
        .catch(error => {
          console.error("Ошибка при добавлении лайка:", error);
        })
    } else {
      api.deleteLike(this._cardId)
        .then((res) => {
          event.target.closest(".element__like").classList.toggle("element__like_active")
          likeCounterElement.innerHTML = res.likes.length
          this._hasLiked = false
        })
        .catch(error => {
          console.error("Ошибка при удалении лайка:", error);
        });
    }
  }

  _getCardInfo() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".element__like");
    likeButton.addEventListener("click", this._handleLikeCard.bind(this));

    const trashButton = cardElement.querySelector(".element__trash-button")
    trashButton.addEventListener("click", () => {
      const deleteConfirm = new PopupConfirm(".popup_delete", trashButton, this._card)
      deleteConfirm.open()
    })

    const cardImage = cardElement.querySelector(".element__image");
    cardImage.addEventListener("click", () => {
      this._getCardInfo();
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".element__image");
    const cardName = cardElement.querySelector(".element__name");
    const likeCounter = cardElement.querySelector(".element__like-counter");
    const likeButton = cardElement.querySelector(".element__like");
    const deleteButton = cardElement.querySelector(".element__trash-button");

    if (this._hasLiked) {
      likeButton.classList.add("element__like_active");
    } 

    if (!this._isOwner) {
      deleteButton.classList.add("element__trash-button_hidden");
    } 
    

    likeCounter.innerHTML = this._likes.length
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}