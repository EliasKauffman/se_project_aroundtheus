// Validation

const showInputError = (formEl, inputEl, errorMessage, options) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formEl, inputEl, options) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formEl, inputEl, options) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
};

const hasInvalidInput = (inputEls) => {
  return inputEls.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const toggleButtonState = (inputEls, buttonEl, options) => {
  if (hasInvalidInput(inputEls)) {
    buttonEl.classList.add(options.inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(options.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

const setEventListeners = (formEl, options) => {
  const inputEls = Array.from(formEl.querySelectorAll(options.inputSelector));
  const buttonEl = formEl.querySelector(options.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", function (e) {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, buttonEl, options);
    });
  });
};

function enableValidation(options) {
  formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
