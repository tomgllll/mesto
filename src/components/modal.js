export function openModal(modal) {
    modal.style.visibility = "visible";
    modal.style.opacity = 1;
}

export function closeModal(modal) {
    modal.style.opacity = 0;
    modal.style.visibility = "hidden";
}