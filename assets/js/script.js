/**
 * This script initializes a calculator and handles various events and functions related to the calculator.
 * The calculator allows the user to calculate their age, the year they were born, and the date difference between two events.
 * It also includes functions to toggle a modal, handle radio button changes, reset the calculator state, display questions based on the selected calculator type,
 * hide prompts, show the recalculate button, run the calculator based on the selected calculator type, and handle various event listeners.
 * The script also includes references to HTML elements and classes for manipulation and display purposes.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the calculator
  const initialCalculatorType = "HowOldAmIQuestion";
  runCalculator(initialCalculatorType);

  const modal = document.getElementById("instructionModal");
  const btn = document.getElementById("instructionButton");
  const span = document.querySelector(".close");

  btn.addEventListener("click", toggleModal);
  span.addEventListener("click", closeModal);
  window.addEventListener("click", outsideClick);

  function toggleModal() {
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function outsideClick(e) {
    if (e.target == modal) modal.style.display = "none";
  }
});

// Event listeners for radio buttons
document.querySelectorAll('input[name="resultType"]').forEach((radio) => {
  radio.addEventListener("change", handleRadioChange);
});

// Event listeners for calculate and recalculate buttons
document.getElementById("calculateButtonAge").addEventListener("click", () => {
  hideAgePrompts();
  calculateCorrectDOB();
  showRecalculateButton();
});

document.getElementById("calculateButtonBorn").addEventListener("click", () => {
  hideBornPrompts();
  calculateBornYear();
  showRecalculateButton();
});

document
  .getElementById("calculateButtonDifference")
  .addEventListener("click", () => {
    hideDifferencePrompts();
    calculateDateDifference();
    showRecalculateButton();
  });

document
  .getElementById("recalculateButtonAge")
  .addEventListener("click", () => {
    runCalculator("HowOldAmIQuestion");
  });

document
  .getElementById("recalculateButtonBorn")
  .addEventListener("click", () => {
    runCalculator("WhatYearWasIBorn");
  });

document
  .getElementById("recalculateButtonDifference")
  .addEventListener("click", () => {
    runCalculator("HowLongUntilSince");
  });

const ageResultElement = document.getElementById("question-dob");
const bornResultElement = document.getElementById("question-born");
const differenceResultElement = document.getElementById("question-difference");

const ageErrorElement = document.getElementById("ageError");
const bornErrorElement = document.getElementById("bornError");
const differenceErrorElement = document.getElementById("differenceError");

function handleRadioChange() {
  const selectedResultType = document.querySelector(
    'input[name="resultType"]:checked'
  ).value;
  displayQuestion(selectedResultType);
}

function resetCalculateState() {
  document
    .querySelectorAll(".calculate")
    .forEach((button) => button.classList.remove("hide"));
  document
    .querySelectorAll(".dob, .years, .difference")
    .forEach((input) => input.classList.remove("hide"));
  document
    .querySelectorAll(".recalculate")
    .forEach((button) => button.classList.add("hide"));
  document
    .querySelectorAll(".result")
    .forEach((result) => result.classList.add("hide"));
  document
    .querySelectorAll(".error")
    .forEach((error) => error.classList.add("hide"));

  // Show all labels and prompts initially
  document
    .querySelectorAll(".prompt")
    .forEach((prompt) => prompt.classList.remove("hide"));
}

function showRecalculateButton() {
  document
    .querySelectorAll(".calculate")
    .forEach((button) => button.classList.add("hide"));
  document
    .querySelectorAll(".dob, .years, .difference")
    .forEach((input) => input.classList.add("hide"));
  document
    .querySelectorAll(".recalculate")
    .forEach((button) => button.classList.remove("hide"));
  document
    .querySelectorAll(".result")
    .forEach((result) => result.classList.remove("hide"));
}

function runCalculator(calculatorType) {
  const validCalculatorTypes = [
    "HowOldAmIQuestion",
    "WhatYearWasIBorn",
    "HowLongUntilSince",
  ];

  if (!validCalculatorTypes.includes(calculatorType)) {
    console.error(`Unknown calculator type: ${calculatorType}. Aborting!`);
    return;
  }

  resetCalculateState();
  const radioInput = document.querySelector(`input[value="${calculatorType}"]`);

  if (radioInput) {
    radioInput.checked = true;
    displayQuestion(calculatorType);
  } else {
    console.error(
      `Radio button for calculator type ${calculatorType} not found. Aborting!`
    );
  }

  displayQuestion(calculatorType);
}

function displayQuestion(calculatorType) {
  const ageQuestionElement = document.getElementById("ageQuestion");
  if (!ageQuestionElement) {
    console.error("Element with id 'ageQuestion' not found. Aborting!");
    return;
  }

  ageResultElement.classList.add("hide");
  bornResultElement.classList.add("hide");
  differenceResultElement.classList.add("hide");

  switch (calculatorType) {
    case "HowOldAmIQuestion":
      ageQuestionElement.textContent = "How old am I?";
      ageResultElement.classList.remove("hide");
      break;
    case "WhatYearWasIBorn":
      ageQuestionElement.textContent = "What year was I born?";
      bornResultElement.classList.remove("hide");
      break;
    case "HowLongUntilSince":
      ageQuestionElement.textContent = "How long until / since?";
      differenceResultElement.classList.remove("hide");
      break;
    default:
      console.error(`Unknown calculator type: ${calculatorType}. Aborting!`);
  }
}

function hideAgePrompts() {
  document.getElementById("birthDatePrompt").classList.add("hide");
}

function hideBornPrompts() {
  document.getElementById("bornPrompt").classList.add("hide");
}

function hideDifferencePrompts() {
  document.getElementById("eventDatePrompt").classList.add("hide");
  document.getElementById("currentDatePrompt").classList.add("hide");
}
