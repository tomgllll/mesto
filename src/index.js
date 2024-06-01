import "./index.css";

import * as initialCards from "./cards";
import { createCard, likeCard, deleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

const userTemplate = document.querySelector("#card-template").content;

const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup.popup_type_edit");
const profileInfo = document.querySelector(".profile__info");

const editForm = document.forms["edit-profile"];
const editNameInput = editForm.elements.name;
const editDescriptionInput = editForm.elements.description;

const addNewCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup.popup_type_new-card");
const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements.link;

const imagePopup = document.querySelector(".popup.popup_type_image");
const imagePopupImg = imagePopup.querySelector(".popup__image");
const imagePopupName = imagePopup.querySelector(".popup__caption");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(
    card.link,
    card.name,
    userTemplate,
    deleteCard,
    likeCard
  );
  placesList.append(cardElement);
});

// edit popup
function openEditProfilePopup() {
  editNameInput.value = profileInfo.querySelector(".profile__title").textContent;
  editDescriptionInput.value = profileInfo.querySelector(".profile__description").textContent;

  editForm.addEventListener("submit", onEditFormSubmit);
  editPopup.addEventListener("click", clickEditOverlay);
  window.addEventListener("keydown", closeEditPopupByEsc);

  openModal(editPopup);
}

function clickEditOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeEditPopup();
  }
}

function closeEditPopupByEsc(evt) {
  if (evt.keyCode === 27) {
    closeEditPopup();
  }
}

function closeEditPopup() {
  closeModal(editPopup);

  editForm.removeEventListener("submit", onEditFormSubmit);
  editPopup.removeEventListener("click", clickEditOverlay);
  window.removeEventListener("keydown", closeEditPopupByEsc);
}

function onEditFormSubmit(evt) {
  evt.preventDefault();

  profileInfo.querySelector(".profile__title").textContent =
    editNameInput.value;
  profileInfo.querySelector(".profile__description").textContent =
    editForm.elements.description.value;

  closeEditPopup();
}
// /edit popup

// add card
function openCardPopup() {
  placeNameInput.value = "";
  linkInput.value = "";

  newCardForm.addEventListener("submit", submitNewCard);
  newCardPopup.addEventListener("click", clickNewCardOverlay);
  window.addEventListener("keydown", closeNewCardPopupByEsc);

  openModal(newCardPopup);
}

function closeNewCardPopup() {
  closeModal(newCardPopup);

  newCardForm.removeEventListener("submit", submitNewCard);
  newCardPopup.removeEventListener("click", clickNewCardOverlay);
  window.removeEventListener("keydown", closeNewCardPopupByEsc);
}

function closeNewCardPopupByEsc(evt) {
  if (evt.keyCode === 27) {
    closeNewCardPopup();
  }
}

function clickNewCardOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeNewCardPopup();
  }
}

function submitNewCard(evt) {
  evt.preventDefault();

  const cardElement = createCard(
    linkInput.value,
    placeNameInput.value,
    userTemplate,
    deleteCard,
    likeCard
  );
  placesList.prepend(cardElement);

  closeNewCardPopup();
}
// /add card

// image popup
function openImagePopup(evt) {
  if (evt.target.classList.contains("card__image")) {
    imagePopupImg.src = evt.target.src;
    imagePopupImg.alt = evt.target.alt;
    imagePopupName.textContent = evt.target.alt;

    openModal(imagePopup);

    imagePopup.addEventListener("click", clickImagePopupOverlay);
    window.addEventListener("keydown", closeImagePopupByEsc);
  }
}

function closeImagePopup() {
  closeModal(imagePopup);

  imagePopup.removeEventListener("click", clickImagePopupOverlay);
  window.removeEventListener("keydown", closeImagePopupByEsc);
}

function closeImagePopupByEsc(evt) {
  if (evt.keyCode === 27) {
    closeImagePopup();
  }
}

function clickImagePopupOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeImagePopup();
  }
}
// /image popup

editProfileButton.addEventListener("click", openEditProfilePopup);
addNewCardButton.addEventListener("click", openCardPopup);
placesList.addEventListener("click", openImagePopup);
