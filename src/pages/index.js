import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/Constants.js";
import "./index.css";

const addImageModal = document.querySelector("#add-modal");
const addCardFormElement = document.forms["addCard"];
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
const imagePreviewInfo = previewImageModal.querySelector(".modal__description");

// Form Validation
const editFormValidator = new FormValidator(validationSettings, profileForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationSettings, cardForm);
addFormValidator.enableValidation();

// Modal Functions

const popupWithImage = new PopupWithImage({ popupSelector: "#preview-modal" });
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: (formData) => {
    const name = formData["input-name"];
    const description = formData["input-description"];
    profileName.textContent = name;
    profileDescription.textContent = description;
    popupWithFormEdit.close();
  },
});
popupWithFormEdit.setEventListeners();

const popupWithFormAddImage = new PopupWithForm({
  popupSelector: "#add-modal",
  handleFormSubmit: (formData) => {
    const name = formData["input-title"];
    const link = formData["input-link"];
    renderCard({ name, link }, cardListEL);
    popupWithFormAddImage.close();
  },
});
popupWithFormAddImage.setEventListeners();

function handleImageClick(name, link) {
  imagePreviewInfo.textContent = name;
  popupWithImage.open({ name, link });
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardElement = getCardElement(card);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

function handelAddCardSubmit(evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  renderCard({ name, link }, cardListEL);
  popupWithFormAddImage.close(addImageModal);
  inputTitle.value = "";
  inputLink.value = "";
  addFormValidator.disableButton();
}
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  popupWithFormEdit.open(editProfileModal);
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputDescritpion.value = currentUserInfo.job;
  editFormValidator.checkValidation();
});

function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescritpion.value;
  popupWithFormEdit.close(editProfileModal);
}

profileForm.addEventListener("submit", saveProfileChanges);

addNewCardButton.addEventListener("click", () => {
  popupWithFormAddImage.open(addImageModal);
  addFormValidator.disableButton();
});

cardForm.addEventListener("submit", handelAddCardSubmit);
