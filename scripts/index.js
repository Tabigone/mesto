const editButton = document.querySelector(".profile__info_edit-button");
const saveButton = document.querySelector(".popup__form-item_button");
const profileName = document.querySelector(".profile__info_name");
const profileSubtitle = document.querySelector(".profile__info_subtitle");
const addCardButton = document.querySelector(".profile__add-button");
const blockElements = document.querySelector(".elements");
const popupImageWide = document.querySelector(".popup__image_wide");
const popupImageTitle = document.querySelector(".popup__image_title");
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

function openPopup(popupType) {
    popupType.classList.add("popup_condition_opened");
    popupType.classList.remove("popup_condition_hidden");
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
    closePopup(document.querySelector("._profile"))
}
saveButton.addEventListener("click", addProfileInfo);

editButton.addEventListener("click", function (){
    openPopup(document.querySelector("._profile"))
});

addCardButton.addEventListener("click", function (){
    openPopup(document.querySelector("._cards"))
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
    openPopup(document.querySelector("._image"));
    popupImageWide.src = event.target.src;
    const currentCard = event.target.closest(".element")
    popupImageTitle.textContent = currentCard.querySelector(".element__name").textContent;
    openPopup(document.querySelector("._image"));
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
    closePopup(document.querySelector("._cards"))
}

document.querySelector("#card-form").addEventListener("submit", function(event){
        event.preventDefault();
});

const saveCardButton = document.querySelector("._cards-item_button")
saveCardButton.addEventListener("click", addNewCard);