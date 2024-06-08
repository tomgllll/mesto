import "./index.css";

import {createCard, deleteCard, likeCard} from "./components/card";
import {closePopup, openPopup, setClosePopupEventListeners} from "./components/modal";
import {addNewCard, getInitialCards, getMyInfo, updateAvatar, updateMyInfo} from "./components/api";
import {clearValidation, enableValidation} from "./components/validation";

const cardTemplate = document.querySelector("#card-template").content;
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error'
};

const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup.popup_type_edit");
const profileInfo = document.querySelector(".profile__info");

const editForm = document.forms["edit-profile"];
const editNameInput = editForm.elements.name;
const editDescriptionInput = editForm.elements.description;

setClosePopupEventListeners(editPopup);
editForm.addEventListener("submit", onEditFormSubmit);

const addNewCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup.popup_type_new-card");
const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements.link;

setClosePopupEventListeners(newCardPopup);
newCardForm.addEventListener("submit", submitNewCard);

const imagePopup = document.querySelector(".popup.popup_type_image");
const imagePopupImg = imagePopup.querySelector(".popup__image");
const imagePopupName = imagePopup.querySelector(".popup__caption");
setClosePopupEventListeners(imagePopup);

const placesList = document.querySelector(".places__list");

// edit popup
function openEditProfilePopup() {
    editNameInput.value = profileInfo.querySelector(".profile__title").textContent;
    editDescriptionInput.value = profileInfo.querySelector(".profile__description").textContent;

    clearValidation(editPopup, validationConfig);
    openPopup(editPopup);
}

function onEditFormSubmit(evt) {
    evt.preventDefault();

    const name = editNameInput.value;
    const description = editForm.elements.description.value;

    const saveButton = editPopup.querySelector(".popup__button");

    saveButton.textContent = "Сохранение...";

    updateMyInfo(name, description)
        .then(() => {
            profileInfo.querySelector(".profile__title").textContent = name;
            profileInfo.querySelector(".profile__description").textContent = description;
        })
        .catch(err => console.log(err))
        .finally(() => {
            saveButton.textContent = "Сохранить";
            closePopup(editPopup);
        });
}

// /edit popup

// add card
function openCardPopup() {
    placeNameInput.value = "";
    linkInput.value = "";

    clearValidation(newCardPopup, validationConfig);
    openPopup(newCardPopup);
}

function submitNewCard(evt) {
    evt.preventDefault();

    const saveButton = newCardPopup.querySelector(".popup__button");
    saveButton.textContent = "Сохранение...";

    addNewCard(placeNameInput.value, linkInput.value)
        .then((cardData) => {
            const cardElement = createCard(
                cardData,
                cardTemplate,
                cardData.owner,
                deleteCard,
                likeCard,
                openImagePopup
            );
            placesList.prepend(cardElement);
        })
        .catch(error => console.log(error))
        .finally(() => {
            saveButton.textContent = "Сохраненить";
            closePopup(newCardPopup);
        });
}

// /add card

// image popup
function openImagePopup(evt) {
    imagePopupImg.src = evt.target.src;
    imagePopupImg.alt = evt.target.alt;
    imagePopupName.textContent = evt.target.alt;

    openPopup(imagePopup);
}

// /image popup

// profile popup
const profile = document.querySelector('.profile');
const profileImage = profile.querySelector(".profile__image");
const editProfileAvatarPopup = document.querySelector('.popup_type_edit_avatar');
const avatarForm = document.forms['edit-profile-avatar'];
const avatarFormLinkInput = avatarForm.elements['link'];

setClosePopupEventListeners(editProfileAvatarPopup);
avatarForm.addEventListener("submit", submitAvatarForm);

function updateProfileAvatar(link) {
    profileImage.dataset.src = link;
    profileImage.style.backgroundImage = "url('" + link + "')";
}

function openEditAvatarPopup() {
    avatarFormLinkInput.value = profileImage.dataset.src;

    clearValidation(editProfileAvatarPopup, validationConfig);
    openPopup(editProfileAvatarPopup);
}

function submitAvatarForm(evt) {
    evt.preventDefault();

    const saveButton = editProfileAvatarPopup.querySelector(".popup__button");

    saveButton.textContent = "Сохранение...";
    // https://upload.wikimedia.org/wikipedia/ru/7/71/Surf_Coffee_logo.jpg
    // https://avatars.mds.yandex.net/get-altay/1777247/2a000001855437f053eb3a278db29533f9fe/XXL_height
    updateAvatar(avatarFormLinkInput.value)
        .then(() => {
            updateProfileAvatar(avatarFormLinkInput.value);
        })
        .catch(error => console.log(error))
        .finally(() => {
            saveButton.textContent = "Сохранить";
            closePopup(editProfileAvatarPopup);
        });
}

profileImage.addEventListener('click', openEditAvatarPopup);
// /profile popup

Promise.all([
    getMyInfo(),
    getInitialCards()
]).then(([myInfo, initialCards]) => {
    profileInfo.querySelector(".profile__title").textContent = myInfo.name;
    profileInfo.querySelector(".profile__description").textContent = myInfo.about;

    updateProfileAvatar(myInfo.avatar);

    initialCards.forEach((card) => {
        const cardElement = createCard(
            card,
            cardTemplate,
            myInfo,
            deleteCard,
            likeCard,
            openImagePopup
        );
        placesList.append(cardElement);
    })
}).catch(error => console.log(error));

editProfileButton.addEventListener("click", openEditProfilePopup);
addNewCardButton.addEventListener("click", openCardPopup);

enableValidation(validationConfig);