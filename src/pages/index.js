import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";

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
const imagePreview = previewImageModal.querySelector(".modal__preview-image");
const imagePreviewInfo = previewImageModal.querySelector(".modal__description");
const closeButtons = document.querySelectorAll(".modal__close");
const modals = document.querySelectorAll(".modal");

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationSettings, profileForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationSettings, cardForm);
addFormValidator.enableValidation();

// Modal Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(modal);
    }
  });
});

function handleImageClick(name, link) {
  imagePreview.setAttribute("src", link);
  imagePreview.setAttribute("alt", name);
  imagePreviewInfo.textContent = name;
  openModal(previewImageModal);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescritpion.value;
  closeModal(editProfileModal);
}

profileForm.addEventListener("submit", saveProfileChanges);

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

function handelAddCardSubmit(evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  renderCard({ name, link }, cardListEL);
  closeModal(addImageModal);
  inputTitle.value = "";
  inputLink.value = "";
  addFormValidator.disableButton();
}

profileEditButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescritpion.value = profileDescription.textContent;
  editFormValidator.checkValidation();

  openModal(editProfileModal);
});

addNewCardButton.addEventListener("click", () => openModal(addImageModal));
cardForm.addEventListener("submit", handelAddCardSubmit);

const popupWithForm = new PopupWithForm({
  popupSelector: "#add-modal",
  handleFormSubmit: (formData) => {
    const name = formData["input-title"];
    const link = formData["input-link"];
    renderCard({ name, link }, cardListEL);
    popupWithForm.close();
  },
});

popupWithForm.setEventListeners();

const popupWithImage = new PopupWithImage({ popupSelector: "#preview-modal" });
popupWithImage.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = getCardElement(item);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();
