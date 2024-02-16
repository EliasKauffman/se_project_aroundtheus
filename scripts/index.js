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
const previewImageModal = document.querySelector("#preview-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector("#input-name");
const inputDescritpion = document.querySelector("#input-description");
const inputTitle = addCardFormElement.querySelector("#input-title");
const inputLink = addCardFormElement.querySelector("#input-link");
const profileForm = document.forms["editProfile"];
const cardForm = document.forms["addCard"];
const cardListEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const imagePreview = previewImageModal.querySelector(".modal__preview-image");
const imagePreviewInfo = previewImageModal.querySelector(".modal__description");
const closeButtons = document.querySelectorAll(".modal__close");
const modals = document.querySelectorAll(".modal");
// Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardInfoEL = cardElement.querySelector(".card__info");
  const likeButton = cardElement.querySelector(".card__button");
  const deleteButton = cardElement.querySelector(".card__button_type_delete");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEL.addEventListener("click", () => {
    imagePreview.setAttribute("src", cardData.link);
    imagePreview.setAttribute("alt", cardData.name);
    imagePreviewInfo.textContent = cardData.name;
    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_type_like");
  });

  cardImageEL.setAttribute("src", cardData.link);
  cardImageEL.setAttribute("alt", cardData.name);
  cardInfoEL.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleEsc(evt) {
  const modal = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    closeModal(modal);
  }
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
  inputTitle.value = "";
  inputLink.value = "";
}

//Event Listeners

profileEditButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescritpion.value = profileDescription.textContent;

  openModal(editProfileModal);
});

addNewCardButton.addEventListener("click", () => openModal(addImageModal));
profileForm.addEventListener("submit", handelProfileEditSubmit);
cardForm.addEventListener("submit", handelAddCardSubmit);

//Arrays

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEL.append(cardElement);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});
