const editButton = document.querySelector(".profile__info_edit-button");
const popupProfile = document.querySelector(".popup__profile");
const popupCloseIcon = popupProfile.querySelector(".popup__close-icon");
const saveButton = document.querySelector(".popup__form-item_button");
const profileName = document.querySelector(".profile__info_name");
const profileSubtitle = document.querySelector(".profile__info_subtitle");
const popupCards = document.querySelector(".popup__cards");
const addCardButton = document.querySelector(".profile__add-button");
const popupCardCloseIcon = document.querySelector(".popup-cards__close-icon");
const elements = document.querySelector(".elements");
const popupImage = document.querySelector(".popup__image")
const popupImageCloseIcon = document.querySelector(".popup-image__close-icon");
const popupImageWide = document.querySelector(".popup__image_wide");
const popupImageTitle = document.querySelector(".popup__image_title");

function addProfileInfo() {
    let popupProfileName = document.querySelector(".popup__form-item_name");
    let popupProfileSubtitle = document.querySelector(".popup__form-item_subtitle");

    profileName.innerText = `${popupProfileName.value}`;
    profileSubtitle.innerText = `${popupProfileSubtitle.value}`
}
saveButton.addEventListener("click", addProfileInfo);

function openPopupProfile() {
    popupProfile.classList.add("popup_condition_opened");
    popupProfile.classList.remove("popup_condition_hidden");
}
editButton.addEventListener("click", openPopupProfile);


function closePopupProfile() {
    popupProfile.classList.add("popup_condition_hidden");
    popupProfile.classList.remove("popup_condition_opened");
}
popupCloseIcon.addEventListener("click", closePopupProfile);

function openPopupCards() {
    popupCards.classList.add("popup_condition_opened");
    popupCards.classList.remove("popup_condition_hidden");
}
addCardButton.addEventListener("click", openPopupCards);

function closePopupCards() {
    popupCards.classList.add("popup_condition_hidden");
    popupCards.classList.remove("popup_condition_opened");
}
popupCardCloseIcon.addEventListener("click", closePopupCards);

function openPopupImage() {
    popupImage.classList.add("popup_condition_opened");
    popupImage.classList.remove("popup_condition_hidden");
}

function closePopupImage() {
    popupImage.classList.add("popup_condition_hidden");
    popupImage.classList.remove("popup_condition_opened");
}

popupImageCloseIcon.addEventListener("click", closePopupImage);



let cardsArray = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function renderCard(cardNameValue, cardImgValue) {
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = cardImgValue;
    element.querySelector(".element__name").textContent = cardNameValue;

    const likeButton = element.querySelector(".element__like");
    likeButton.addEventListener("click", function (event){
        event.target.classList.toggle("element__like_active");
    });

    const deleteButton = element.querySelector(".element__trash-button");
    deleteButton.addEventListener("click", function (event) {
        event.target.closest(".element").remove();
    })

    const elementImg = element.querySelector(".element__image");
    elementImg.addEventListener("click", openPopupImg);

    elements.prepend(element);
}

function loadCards(cards) {
    for (let i = 0; i < cards.length; i++) {
     const cardImgValue = cards[i].link;
     const cardNameValue = cards[i].name;
     renderCard(cardNameValue, cardImgValue);
    }
}
loadCards(cardsArray)

const popupCardName = document.querySelector("#cards__name")
const popupCardSubtitle = document.querySelector("#cards__subtitle")

function addNewCard () {
    cardsArray.splice(0, 0, {name: popupCardName.value, link: popupCardSubtitle.value})
    const cardImgValue = cardsArray[0].link;
    const cardNameValue = cardsArray[0].name;
    renderCard(cardNameValue, cardImgValue);
}

document.querySelector("#card-form").addEventListener("submit", function(event){
        event.preventDefault();
});

const saveCardButton = document.querySelector(".popup__cards-item_button")
saveCardButton.addEventListener("click", addNewCard);

function openPopupImg (event) {
    openPopupImage(popupImage);
    popupImageWide.src = event.target.src;
    popupImageTitle.textContent = event.target.nextElementSibling.textContent;
    popupImage.classList.add("popup_condition_opened");
    popupImage.classList.remove("popup_condition_hidden");
}
