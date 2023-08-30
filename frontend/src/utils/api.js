class Api {
  constructor({ url }) {
    this._url = url;
  }

  _request(endPoint, options) {
    return fetch(this._url + endPoint, options).then(this._getResponseData);
  }

  _getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  getCards = () => {
    return this._request("/cards", {
      headers: {
        authorization: getToken(),
      },
    });
  };

  updateProfileData = (inputValues) => {
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        authorization: getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    });
  };

  getWebInfo = () => {
    return this._request("/users/me", {
      headers: {
        authorization: getToken(),
      },
    });
  };

  sendNewCard = (inputValues) => {
    return this._request("/cards", {
      method: "POST",
      headers: {
        authorization: getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.place,
        link: inputValues.link,
      }),
    });
  };

  removeCard = (id) => {
    return this._request("/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: getToken(),
      },
    });
  };

  toggleLikeCard = (cardId, isLiked) => {
    const method = isLiked ? "PUT" : "DELETE";

    return this._request(`/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: getToken(),
      },
    });
  };

  sendAvatar = (link) => {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    });
  };
}

// Объект настроек для класса Api
const config = {
  url: "http://localhost:3000"
};

const getToken = () => `Bearer ${localStorage.getItem("token")}`;

// Создание экземпляра класса, описывающего запросы к серверу
const api = new Api(config);

export default api;
