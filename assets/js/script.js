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

  // Open the modal
  function toggleModal() {
    modal.style.display = "flex";
  }

  // Close the modal when clicking on (x)
  function closeModal() {
    modal.style.display = "none";
  }

  // Close the modal when clicking outside of the modal content
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

/**
 * Represents the question that displays the difference result.
 * @type {HTMLElement}
 */
const ageResultElement = document.getElementById("question-dob");
const bornResultElement = document.getElementById("question-born");
const differenceResultElement = document.getElementById("question-difference");

/**
 * Represents the error message.
 * @type {HTMLElement}
 */
const ageErrorElement = document.getElementById("ageError");
const bornErrorElement = document.getElementById("bornError");
const differenceErrorElement = document.getElementById("differenceError");
const defaultMessages = {
  age: "How old am I?",
  born: "What year was I born?",
  difference: "How many days between?",
};

function resetMessages() {
  document.getElementById("ageQuestion").textContent = defaultMessages.age;
  document.getElementById("bornQuestion").textContent = defaultMessages.born;
  document.getElementById("differenceQuestion").textContent =
    defaultMessages.difference;
}

/**
 * Handles the change event of the radio buttons.
 * Retrieves the selected result type and calls the displayQuestion function.
 */

function handleRadioChange() {
  const selectedResultType = document.querySelector(
    'input[name="resultType"]:checked'
  ).value;

  // Reset input fields for the selected calculator type

  resetInputsForType(selectedResultType);

  // Reset messages to default

  resetMessages();

  // Update display based on the selected calculator type

  runCalculator(selectedResultType);
  displayQuestion(selectedResultType);
}

/**
 * Resets input fields and visibility based on the type of calculator.
 *
 * @param {string} type - The type of calculator.
 */
function resetInputsForType(type) {
  // Clear input fields and reset visibility based on the type of calculator

  switch (type) {
    case "HowOldAmIQuestion":
      document.querySelectorAll(".dob").forEach((input) => (input.value = ""));

      document
        .querySelectorAll(".years, .difference")
        .forEach((input) => input.classList.add("hide"));

      break;

    case "WhatYearWasIBorn":
      document
        .querySelectorAll(".years")
        .forEach((input) => (input.value = ""));

      document
        .querySelectorAll(".dob, .difference")
        .forEach((input) => input.classList.add("hide"));

      break;

    case "HowLongUntilSince":
      document
        .querySelectorAll(".difference")
        .forEach((input) => (input.value = ""));

      document
        .querySelectorAll(".dob, .years")
        .forEach((input) => input.classList.add("hide"));

      break;

    default:
      console.error(`Unknown calculator type: ${type}. No inputs reset.`);
  }

  // Show prompts for the selected type

  switch (type) {
    case "HowOldAmIQuestion":
      document.getElementById("birthDatePrompt").classList.remove("hide");

      break;

    case "WhatYearWasIBorn":
      document.getElementById("bornPrompt").classList.remove("hide");

      break;

    case "HowLongUntilSince":
      document.getElementById("eventDatePrompt").classList.remove("hide");

      document.getElementById("currentDatePrompt").classList.remove("hide");

      break;
  }
}

/**
 * Resets the state of the calculate form.
 * Hides the result messages, error messages, and prompts.
 * Clears the input values and removes the "hide" class from the calculate buttons and hidden inputs.
 * Adds the "hide" class to the recalculate buttons.
 * Calls helper functions to reset specific messages.
 */
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

/**
 * Runs the calculator based on the specified calculator type.
 * 
 * @param {string} calculatorType - The type of calculator to run.
 * @returns {void}
 */
function runCalculator(calculatorType) {
  const radioInput = document.querySelector(`input[value="${calculatorType}"]`);

  if (!radioInput) {
    console.error(
      `Radio button for calculator type ${calculatorType} not found. Aborting!`
    );
    return;
  }

  const validCalculatorTypes = new Set([
    "HowOldAmIQuestion",
    "WhatYearWasIBorn",
    "HowLongUntilSince",
  ]);

  if (!validCalculatorTypes.has(calculatorType)) {
    console.error(`Unknown calculator type: ${calculatorType}. Aborting!`);
    return;
  }

  resetCalculateState();
  radioInput.checked = true;
  displayQuestion(calculatorType);
}

/**
 * Displays a question based on the calculator type.
 *
 * @param {string} calculatorType - The type of calculator.
 * @returns {void}
 */
function displayQuestion(calculatorType) {
  const ageQuestionElement = document.getElementById("ageQuestion");
  if (!ageQuestionElement) {
    console.error("Element with id 'ageQuestion' not found. Aborting!");
    return;
  }

  // Hide all result elements
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

/**
 * Hides the age prompts by adding the "hide" class to the birthDatePrompt element.
 */
function hideAgePrompts() {
  document.getElementById("birthDatePrompt").classList.add("hide");
}

/**
 * Hides the "born" prompts by adding the "hide" class to the element with the ID "bornPrompt".
 */
function hideBornPrompts() {
  document.getElementById("bornPrompt").classList.add("hide");
}

/**
 * Hides the difference prompts by adding the "hide" class to their respective elements.
 */
function hideDifferencePrompts() {
  document.getElementById("eventDatePrompt").classList.add("hide");
  document.getElementById("currentDatePrompt").classList.add("hide");
}
