export function createCard(link, name, template, deleteCallback, likeCardCallback) {
    const placeCard = template.cloneNode(true);
    const placeCardImage = placeCard.querySelector(".card__image");
  
    placeCardImage.src = link;
    placeCardImage.alt = name;
    placeCard.querySelector(".card__title").textContent = name;
  
    placeCard
      .querySelector(".card__delete-button")
      .addEventListener("click", deleteCallback);
    placeCard
      .querySelector(".card__like-button")
      .addEventListener("click", likeCardCallback);
  
    return placeCard;
  }
  
  export function deleteCard(evt) {
    evt.target.parentElement.remove();
  }
  
  export function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }