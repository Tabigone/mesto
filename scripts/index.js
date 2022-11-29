let editButton = document.querySelector(".profile__info_edit-button")
let popup = document.querySelector(".popup");
let popupCloseIcon = popup.querySelector(".popup__close-icon");
let saveButton = document.querySelector(".popup__form-item_button");
let profileName = document.querySelector(".profile__info_name");
let profileSubtitle = document.querySelector(".profile__info_subtitle")

function addProfileInfo() {
    let popupProfileName = document.querySelector(".popup__form-item_name");
    let popupProfileSubtitle = document.querySelector(".popup__form-item_subtitle");

    profileName.innerHTML = `<h1 class="profile__info_name">${popupProfileName.value}</h1>`;
    profileSubtitle.innerHTML = `<p class="profile__info_subtitle">${popupProfileSubtitle.value}</p>`
}
saveButton.addEventListener("click", addProfileInfo);


function openPopup() {
    popup.classList.add("popup_condition_opened");
    popup.classList.remove("popup_condition_hidden");
}
editButton.addEventListener("click", openPopup);


function closePopup() {
    popup.classList.add("popup_condition_hidden");
    popup.classList.remove("popup_condition_opened");
}
popupCloseIcon.addEventListener("click", closePopup);






