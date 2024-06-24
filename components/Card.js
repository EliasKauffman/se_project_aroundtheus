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
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".card__button_type_delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
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

  _handleImageClick() {
    imagePreview.setAttribute("src", data.link);
    imagePreview.setAttribute("alt", data.name);
    imagePreviewInfo.textContent = data.name;
    openModal(previewImageModal);
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .querySelector(".card")
      .content.cloneNode(true);
    console.log(this._cardElement);

    this._setEventListeners();
  }
}
