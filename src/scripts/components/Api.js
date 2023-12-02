export default class Api {
  constructor({ serverLink, headers }) {
    this._serverLink = serverLink;
    this._headers = headers;
    this._checkRequestStatus = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  setProfileAvatar(data) {
    return fetch(`${this._serverLink}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.link }),
    })
    .then(this._checkRequestStatus);
  }

  getProfileInfo() { 
    return fetch(`${this._serverLink}/users/me`, { 
      headers: this._headers 
    })
    .then(this._checkRequestStatus);
  } 

  setUserInfo(object) { 
    return fetch(`${this._serverLink}/users/me`, { 
      method: "PATCH", 
      headers: this._headers, 
      body: JSON.stringify({
        name: object.name, 
        about: object.subtitle
      }), 
    }).then(this._checkRequestStatus); 
  }

  getInitialCards() {
    return fetch(`${this._serverLink}/cards`, {
      headers: this._headers 
    })
    .then(this._checkRequestStatus);
  }

  createCard(card) { 
    return fetch(`${this._serverLink}/cards`, { 
      method: "POST", 
      headers: this._headers, 
      body: JSON.stringify(card), 
    }).then(this._checkRequestStatus); 
  }

  setLike(id) { 
    return fetch(`${this._serverLink}/cards/${id}/likes`, { 
      method: "PUT", 
      headers: this._headers, 
    }).then(this._checkRequestStatus); 
  } 
 
  deleteLike(id) { 
    return fetch(`${this._serverLink}/cards/likes/${id}`, { 
      method: "DELETE", 
      headers: this._headers, 
    }).then(this._checkRequestStatus); 
  }

  deleteCard(id) { 
    return fetch(`${this._serverLink}/cards/${id}`, { 
      method: "DELETE", 
      headers: this._headers, 
    }).then(this._checkRequestStatus); 
  } 
}
