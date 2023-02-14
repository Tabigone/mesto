const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__info-name");
const profileSubtitle = document.querySelector(".profile__info-subtitle");
const addCardButton = document.querySelector(".profile__add-button");
const blockElements = document.querySelector(".elements");
const popupImageWide = document.querySelector(".popup__wide");
const popupImageTitle = document.querySelector(".popup__card-name");
const popupProfileName = document.querySelector(".popup__form-item_name");
const popupProfileSubtitle = document.querySelector(".popup__form-item_subtitle");
const elementTemplate = document.querySelector('#element-template').content;

const scrollController = {
    disabledScroll() {
        document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
        document.body.style.overflow = "hidden";
    },
    enabledScroll() {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "";
    }
}

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

const closeIconArray = Array.from(document.querySelectorAll(".popup__close-icon"));
closeIconArray.forEach(closeIcon => {
    closeIcon.addEventListener("click", function (evt) {
        closePopup(evt.target.closest(".popup"));
    })
})

function addProfileInfo() {
    profileName.innerText = popupProfileName.value;
    profileSubtitle.innerText = popupProfileSubtitle.value;
    closePopup(document.querySelector(".popup_profile"))
}

editButton.addEventListener("click", function (){
    openPopup(document.querySelector(".popup_profile"))
});

addCardButton.addEventListener("click", function (){
    openPopup(document.querySelector(".popup_cards"))
});

const cardsArray = [
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

function openPopupImg (event) {
    openPopup(document.querySelector(".popup_image"));
    popupImageWide.src = event.target.src;
    const currentCard = event.target.closest(".element")
    popupImageTitle.textContent = currentCard.querySelector(".element__name").textContent;
}

function renderCard(cardName, cardImg) {
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = cardImg;
    element.querySelector(".element__name").textContent = cardName;
    element.querySelector(".element__image").alt = cardName;

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

    blockElements.prepend(element);
}

for (let i = 0; i < cardsArray.length; i++) {
    const cardImgValue = cardsArray[i].link;
    const cardNameValue = cardsArray[i].name;
    renderCard(cardNameValue, cardImgValue);
}

const popupCardName = document.querySelector("#cards__name")
const popupCardsLink = document.querySelector("#cards__link")

function addNewCard () {
    const cardImgValue =  popupCardsLink.value;
    const cardNameValue = popupCardName.value;
    renderCard(cardNameValue, cardImgValue);
    closePopup(document.querySelector(".popup_cards"))
}

document.querySelector("#card-form").addEventListener("submit", function(event){
    event.preventDefault();
    addNewCard()
    popupCardsLink.value = "";
    popupCardName.value = ""
    toggleButtonState(cardInputList, cardButton);
});

document.querySelector("#profile-form").addEventListener("submit", function(event){
    event.preventDefault();
    addProfileInfo()
});

const popupCoverArray = Array.from(document.querySelectorAll(".popup__cover"));
popupCoverArray.forEach(cover => {
    cover.addEventListener("click", function (evt) {
        closePopup(evt.target.closest(".popup"));

    })
})

const popupArray = Array.from(document.querySelectorAll(".popup"));
popupArray.forEach(popup => {
    document.addEventListener("keydown", function (evt) {
        if (evt.code === "Escape") {
            closePopup(popup);
        }
    })
})


