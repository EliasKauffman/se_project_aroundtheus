export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button")
      .addEventListener("click", () => this._handleLikeIcon());
    this._cardElement
      .querySelector(".card__button_type_delete")
      .addEventListener("click", () => this._handleDeleteCard());

    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewPicture({ name: this._name, link: this._link });
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__button_type_like");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  getCardElement() {
    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardName = this._cardElement.querySelector(".card__info");
    this._cardImageEl.setAttribute("src", this._link);
    this._cardImageEl.setAttribute("alt", this._name);
    this._cardName.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
