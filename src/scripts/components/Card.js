class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; 
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector(".element").cloneNode(true);
  }

  _handleLikeCard(event) {
    event.target.classList.toggle("element__like_active");
  }

  _handleDeleteCard(event) {
    event.target.closest(".element").remove();
  }


  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".element__like");
    likeButton.addEventListener("click", this._handleLikeCard);

    const deleteButton = cardElement.querySelector(".element__trash-button");
    deleteButton.addEventListener("click", this._handleDeleteCard);

    const cardImage = cardElement.querySelector(".element__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".element__image");
    const cardName = cardElement.querySelector(".element__name");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}

export default Card;
