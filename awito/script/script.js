"use strict";

const dataBase = [];

const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item "),
  modalBtnWarning = document.querySelector(".modal__btn-warning");

const checkForm = () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? "none" : "";
};

// Get form elements without button in arr
const elementsModalSubmit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON" && elem.type !== "submit"
);
// console.log(
//   [...elementsModalSubmit].filter((elem) => {
//     return elem.tagName !== "BUTTON";
//   })
// );

// Function close modal

// const closeModal = (event) => {
//   const target = event.target;

//   if (
//     target.classList.contains("modal__close") ||
//     target === modalAdd ||
//     target === modalItem
//   ) {
//     modalAdd.classList.add("hide");
//     modalItem.classList.add("hide");
//     modalSubmit.reset();
//   }
// };

//Function close modal
const closeModal = function (event) {
  const target = event.target;
  // console.log(this);
  // console.log(target);

  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
    modalSubmit.reset();
    checkForm();
  }
};

//Verification form on value
modalSubmit.addEventListener("input", checkForm);

modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    // console.log(elem);
    itemObj[elem.name] = elem.value;
  }
  // console.log(itemObj);
  dataBase.push(itemObj);
  // console.log(dataBase);
  closeModal({ target: modalAdd });
});

// show modal
addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  modalBtnSubmit.disabled = true;
  document.addEventListener("keydown", closeModal);
});

catalog.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".card")) {
    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
});

//Clos modal
modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);
