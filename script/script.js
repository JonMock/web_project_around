const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");

const profileName = profileNameElement.textContent;
const profileAbout = profileAboutElement.textContent;

const profileEditButton = document.querySelector(".profile__edit-button");
const editPopupElement = document.querySelector(".popup");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const closeButtonPopup = document.querySelector(".popup__close-button");

//Agregar imagenes
const btnAddCard = document.querySelector(".profile__add-button");
const popUpCard = document.querySelector("#add-image-popup");
const inputTitle = document.querySelector("#input-title-place");
const inputImage = document.querySelector("#input-url-image");

// Card Template

const templateCard = document.querySelector(".template-card");
const spaceCard = document.querySelector(".cards");
const formCard = document.querySelector("#add-image-form");
const groupImage = document.getElementById("add-image-popup");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// popup imagenes

const popupOpenImage = document.querySelector("#popup-image-open");
const imageClose = document.querySelector(".popup__close-imag");
const popupTitleImage = document.querySelector(".popup__image-title");
const popupImage = document.querySelector(".popup__image");

//editar perfil

let initialProfileName = profileName;
let initialProfileAbout = profileAbout;

const overlayEdit = document.querySelector("#popup-edit-overlay");
const overlayAdd = document.querySelector("#popup-add-overlay");
const overlayImage = document.querySelector("#popup-image-overlay");

function setPopupInput() {
  nameInput.value = initialProfileName;
  aboutInput.value = initialProfileAbout;
}

function openPopup() {
  editPopupElement.classList.add("popup_opened");
  overlayEdit.removeEventListener("click", handleOverlayClick);
}

function handlePopupClick(event) {
  setPopupInput();
  openPopup();
}

function closePopup() {
  editPopupElement.classList.remove("popup_opened");
  overlayEdit.removeEventListener("click", handleOverlayClick);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;
  initialProfileName = nameInput.value;
  initialProfileAbout = aboutInput.value;
  closePopup();
}

// Agregar imagenes

function openImageAdd() {
  popUpCard.classList.add("popup_opened");
  overlayAdd.removeEventListener("click", handleOverlayClick);
}

function handleImageAddClick(event) {
  openImageAdd();
}

function closeImageAdd() {
  popUpCard.classList.remove("popup_opened");
  overlayAdd.removeEventListener("click", handleOverlayClick);
}

function handleAddImageSubmitForm(evt) {
  evt.preventDefault();
  const imageNewTitle = inputTitle.value;
  const imageNewURL = inputImage.value;
  closeImageAdd();
}

// Card Template

function cardGenerator(title, link) {
  const card = templateCard.cloneNode(true).content.querySelector(".card");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__information-name");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", function () {
    card.remove();
  });
  cardImage.addEventListener("click", function () {
    handleOpenImage(title, link);
  });
  return card;
}

initialCards.forEach(function (element) {
  const newCard = cardGenerator(element.name, element.link);
  spaceCard.append(newCard);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  if (evt.submitter.classList.contains("popup__save-button")) {
    const newCard = cardGenerator(inputTitle.value, inputImage.value);
    spaceCard.prepend(newCard);
  }
  closeImageAdd();
}

const popupId = document.querySelector(".popup");
popupId.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup")) {
    closePopup();
  }
});

//Popup imagenes

function handleOpenImage(title, link) {
  popupImage.src = link;
  popupTitleImage.textContent = title;
  popupImage.alt = title;
  popupOpenImage.classList.add("popup_opened");
  imageClose.addEventListener("click", handleCloseImage);
  overlayImage.addEventListener("click", handleOverlayClick);
}

function handleCloseImage() {
  popupOpenImage.classList.remove("popup_opened");
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
    closePopup();
    closeImageAdd();
    handleCloseImage();
  }
}

function closeWithEsc(event) {
  if (event.key === "Escape") {
    closePopup();
    closeImageAdd();
    handleCloseImage();
  }
}

//Eventos

profileEditButton.addEventListener("click", handlePopupClick);
formElement.addEventListener("submit", handleProfileFormSubmit);
closeButtonPopup.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);

btnAddCard.addEventListener("click", handleImageAddClick);
formCard.addEventListener("submit", handleAddCardSubmit);
formCard.addEventListener("submit", handleAddCardSubmit);
imageClose.addEventListener("click", handleCloseImage);

popUpCard
  .querySelector("#close-button-image")
  .addEventListener("click", closeImageAdd);

popupId.addEventListener("click", handleOverlayClick);
popUpCard.addEventListener("click", handleOverlayClick);
popupOpenImage.addEventListener("click", handleOverlayClick);
document.addEventListener("keydown", closeWithEsc);
