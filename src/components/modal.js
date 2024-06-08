export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscape);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

export function closePopupByEscape(event) {
    if(event.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

export function setClosePopupEventListeners(popupElement) {
    const closeButtonElement = popupElement.querySelector(".popup__close")
    closeButtonElement.addEventListener("click", () => {
        closePopup(popupElement);
    });
    popupElement.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closePopup(popupElement);
        }
    });
}