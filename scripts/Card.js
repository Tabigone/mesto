class Card {
    constructor(data, templateSelector) {
        this._data = data;
        this._templateSelector = templateSelector;
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
    }

    generateCard() {
        const cardElement = this._getTemplate();
        const cardImage = cardElement.querySelector(".element__image");
        const cardName = cardElement.querySelector(".element__name");

        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        cardName.textContent = this._data.name;

        this._setEventListeners(cardElement);

        return cardElement;
    }
}

export default Card;