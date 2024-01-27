const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements
const addImageModal = document.querySelector("#add-modal");
const addCardFormElement = addImageModal.querySelector(".modal__form");
const profileEditButton = document.querySelector(".profile__button_type_edit");
const addNewCardButton = document.querySelector(".profile__button_type_add");
const editProfileModal = document.querySelector("#edit-modal");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addImageModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector("#input-name");
const inputDescritpion = document.querySelector("#input-description");
const inputTitle = addCardFormElement.querySelector("#input-title");
const inputLink = addCardFormElement.querySelector("#input-link");
const saveEditForm = editProfileModal.querySelector("#edit-profile-form");
const saveCardForm = addImageModal.querySelector("#add-card-form");
const cardListEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardInfoEL = cardElement.querySelector(".card__info");
  cardImageEL.setAttribute("src", cardData.link);
  cardImageEL.setAttribute("alt", cardData.name);
  cardInfoEL.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// Event Handlers
function handelProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescritpion.value;
  closeModal(editProfileModal);
}

function handelAddCardSubmit(evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  renderCard({ name, link }, cardListEL);
  closeModal(addImageModal);
}

//Event Listeners

profileEditButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescritpion.value = profileDescription.textContent;

  openModal(editProfileModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
addNewCardButton.addEventListener("click", () => openModal(addImageModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addImageModal)
);
saveEditForm.addEventListener("submit", handelProfileEditSubmit);
saveCardForm.addEventListener("submit", handelAddCardSubmit);

//Arrays

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEL.append(cardElement);
});
