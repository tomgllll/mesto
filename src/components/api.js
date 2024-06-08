const cohortId = 'wff-cohort-14';

const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: '3cf04393-7be1-45a0-aec3-a8be97a4f7d4',
        'Content-Type': 'application/json'
    }
}

function getRes(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// profileApi
export const getMyInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(res => getRes(res));
}

export const updateMyInfo = (name, about) => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    }).then(res => getRes(res));
}

export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar })
    })
}
// /profileApi

// cardsApi
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(res => getRes(res));
}

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    }).then(res => getRes(res));
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => getRes(res));
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(res => getRes(res));
}

export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => getRes(res));
}
// /cardsApi
