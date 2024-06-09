import { deleteCard as deleteCardApi, likeCard as likeCardApi, dislikeCard as dislikeCardApi } from "./api";

export function createCard(cardData, template, user, deleteCallback, likeCardCallback, imageClickCallback) {
    const placeCard = template.querySelector('.card').cloneNode(true);
    const placeCardImage = placeCard.querySelector(".card__image");
    const cardLike = placeCard.querySelector(".card__like");
    const cardLikeButton = cardLike.querySelector(".card__like-button");
    const cardLikeCounter = cardLike.querySelector('.card__like-counter');
    const cardDeleteButton = placeCard.querySelector('.card__delete-button');

    placeCardImage.src = cardData.link;
    placeCardImage.alt = cardData.name;
    placeCard.querySelector(".card__title").textContent = cardData.name;

    if (cardData.owner._id !== user._id) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener("click", () => {
            deleteCallback(placeCard, cardData._id, cardLikeButton, cardLikeCounter);
        });
    }

    if (cardData.likes.some(like => like._id === user._id)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    cardLikeCounter.textContent = cardData.likes.length;

    cardLikeButton.addEventListener("click", () => {
        likeCardCallback(placeCard, cardData._id);
    });

    placeCardImage.addEventListener("click", imageClickCallback);

    return placeCard;
}

export function deleteCard(cardElement, id) {
    deleteCardApi(id)
        .then(() => {
            cardElement.remove();
        })
        .catch(error => console.log(error));
}

export function likeCard(cardElement, cardId, likeButton, likeCounter) {
    if (likeButton.classList.contains("card__like-button_is-active")) {
        dislikeCardApi(cardId)
            .then((cardData) => {
                likeButton.classList.remove("card__like-button_is-active");
                likeCounter.textContent = cardData.likes.length;
            })
            .catch(error => console.log(error));
    } else {
        likeCardApi(cardId)
            .then((cardData) => {
                likeButton.classList.add("card__like-button_is-active");
                likeCounter.textContent = cardData.likes.length;
            })
            .catch(error => console.log(error));
    }
}