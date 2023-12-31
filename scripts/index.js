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
const editButton = document.querySelector(".profile__button_type_edit");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector("#input-name");
const inputDescritpion = document.querySelector("#input-description");
const saveEditForm = modal.querySelector(".modal__form");
const cardListEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
// Functions
function closeModal() {
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

// Event Handlers
function handelProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescritpion.value;
  closeModal();
}

//Event Listeners
editButton.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputDescritpion.value = profileDescription.textContent;

  modal.classList.add("modal_opened");
});

closeButton.addEventListener("click", closeModal);

saveEditForm.addEventListener("submit", handelProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEL.append(cardElement);
});
