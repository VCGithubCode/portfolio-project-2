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
  const closeBtn = document.querySelector(".close");

  // Open the modal when clicking the "Show Instructions" button
  btn.addEventListener("click", toggleModal);

  // Close the modal when clicking on the (x)
  closeBtn.addEventListener("click", closeModal);

  // Close the modal when pressing Enter or Space while focused on the (x)
  closeBtn.addEventListener("keydown", function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default space bar scrolling
      closeModal();
    }
  });

  // Close the modal when clicking outside of the modal content
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Function to open the modal
  function toggleModal() {
    modal.style.display = "flex";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }
});
  // Event listeners for radio buttons
  document.querySelectorAll('input[name="resultType"]').forEach((radio) => {
    radio.addEventListener("change", handleRadioChange);

    // Add keyboard event handling for Enter key
    radio.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        radio.click();
      }
    });
  });

  // Event listeners for labels
  document.querySelectorAll('label.date-question').forEach((label) => {
    label.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const associatedRadio = document.getElementById(label.htmlFor);
        if (associatedRadio) {
          associatedRadio.click();
        }
      }
    });
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
    runCalculator("HowManyDaysBetween");
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

    case "HowManyDaysBetween":
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

    case "HowManyDaysBetween":
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
  const calculateButtons = document.querySelectorAll(".calculate");
  const hiddenInputs = document.querySelectorAll(".dob, .years, .difference");
  const recalculateButtons = document.querySelectorAll(".recalculate");
  const resultMessages = document.querySelectorAll(".result");
  const errorMessages = document.querySelectorAll(".error");
  const allPrompts = document.querySelectorAll(".prompt");

  // Array methods are faster than forEach
  Array.from(calculateButtons).forEach((button) =>
    button.classList.remove("hide")
  );
  Array.from(hiddenInputs).forEach((input) => {
    input.value = "";
    input.classList.remove("hide");
  });
  Array.from(recalculateButtons).forEach((button) =>
    button.classList.add("hide")
  );
  Array.from(resultMessages).forEach((result) => result.classList.add("hide"));
  Array.from(errorMessages).forEach((error) => error.classList.add("hide"));
  Array.from(allPrompts).forEach((prompt) => prompt.classList.remove("hide"));

  resetAgeMessage();
  resetBornMessage();
  resetDifferenceMessage();
}

/**
 * Shows the recalculate button and hides other elements.
 */
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
 * @returns {void} This function does not return a value.
 */
function runCalculator(calculatorType) {
  if (!isValidCalculatorType(calculatorType)) {
    console.error(`Unknown calculator type: ${calculatorType}. Aborting!`);
    return;
  }

  resetCalculateState(); // Reset the state of the UI elements
  selectCalculatorType(calculatorType); // Set the radio button for the type
  displayQuestion(calculatorType); // Display the appropriate question and results
}

function resetAgeMessage() {
  document.getElementById("ageQuestion").textContent = defaultMessages.age;
}

function resetBornMessage() {
  document.getElementById("bornQuestion").textContent = defaultMessages.born;
}

function resetDifferenceMessage() {
  document.getElementById("differenceQuestion").textContent =
    defaultMessages.difference;
}

function isValidCalculatorType(type) {
  const validTypes = [
    "HowOldAmIQuestion",
    "WhatYearWasIBorn",
    "HowManyDaysBetween",
  ];
  return validTypes.includes(type);
}

function selectCalculatorType(type) {
  const radioInput = document.querySelector(`input[value="${type}"]`);
  if (radioInput) {
    radioInput.checked = true;
  } else {
    console.error(
      `Radio button for calculator type ${type} not found. Aborting!`
    );
  }
}

/**
 * Displays a question based on the calculator type.
 *
 * @param {string} calculatorType - The type of calculator.
 * @returns {void} This function does not return a value.
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
    case "HowManyDaysBetween":
      ageQuestionElement.textContent = "How many days between?";
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

/**
 * Calculates the correct date of birth based on the user input and displays the age in years, months, days, hours, minutes, and seconds with correct grammar.
 * @returns {void} This function does not return a value.
 */
function calculateCorrectDOB() {
  const userDate = document.getElementById("userDate").value;
  const ageErrorElement = document.getElementById("ageError");

  // Clear previous error messages
  ageErrorElement.classList.add("hide");
  ageErrorElement.textContent = ""; // Clear the error message text

  // Validate if a date is entered
  if (!userDate) {
    ageErrorElement.textContent = "Please enter your date of birth.";
    ageErrorElement.classList.remove("hide");
    return;
  }

  const currentDate = new Date();
  const inputDate = new Date(userDate);

  // Check if the input date is in the future
  if (inputDate > currentDate) {
    ageErrorElement.textContent = "Date of birth cannot be in the future.";
    ageErrorElement.classList.remove("hide");
    return;
  }

  // Check if the date of birth is more than 130 years ago
  const maxPastDate = new Date();
  maxPastDate.setFullYear(currentDate.getFullYear() - 130);

  if (inputDate < maxPastDate) {
    ageErrorElement.textContent = "Date of birth cannot be more than 130 years ago.";
    ageErrorElement.classList.remove("hide");
    return;
  }

  // Calculate the difference in years, months, days, etc.
  let ageInYears = currentDate.getFullYear() - inputDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - inputDate.getMonth();
  let ageInDays = currentDate.getDate() - inputDate.getDate();
  let ageInHours = currentDate.getHours() - inputDate.getHours();
  let ageInMinutes = currentDate.getMinutes() - inputDate.getMinutes();
  let ageInSeconds = currentDate.getSeconds() - inputDate.getSeconds();

  // Adjust for negative values (e.g., when the current day/month is earlier than the birth date)
  if (ageInSeconds < 0) {
    ageInMinutes--;
    ageInSeconds += 60;
  }

  if (ageInMinutes < 0) {
    ageInHours--;
    ageInMinutes += 60;
  }

  if (ageInHours < 0) {
    ageInDays--;
    ageInHours += 24;
  }

  if (ageInDays < 0) {
    ageInMonths--;
    // Calculate the days in the previous month to adjust
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    ageInDays += previousMonth.getDate();
  }

  if (ageInMonths < 0) {
    ageInYears--;
    ageInMonths += 12;
  }

  // Helper function to return correct singular/plural form
  function formatUnit(value, unit) {
    return `${value} ${unit}${value === 1 ? '' : 's'}`;
  }

  // Display the detailed age breakdown with correct grammar
  const ageDetailMessage = `
    You are ${formatUnit(ageInYears, 'year')}, ${formatUnit(ageInMonths, 'month')}, ${formatUnit(ageInDays, 'day')},
    ${formatUnit(ageInHours, 'hour')}, ${formatUnit(ageInMinutes, 'minute')}, and ${formatUnit(ageInSeconds, 'second')} old.
  `;
  document.getElementById("ageQuestion").textContent = ageDetailMessage;

  // Call checkDate() to perform any additional validations (if necessary)
  checkDate();
}



function calculateBornYear() {
  const userAge = document.getElementById("userAge").value;
  const bornErrorElement = document.getElementById("bornError");
  const bornQuestion = document.getElementById("bornQuestion");

  // Clear previous error messages
  bornErrorElement.classList.add("hide");
  bornErrorElement.textContent = ""; // Clear any previous error messages

  // Check if age is provided
  if (!userAge) {
    bornErrorElement.textContent = "Please enter your age.";
    bornErrorElement.classList.remove("hide");
    return;
  }

  const age = parseInt(userAge, 10);

  // Validate the age (it should be a valid number and non-negative)
  if (isNaN(age) || age < 0 || age > 130) {
    bornErrorElement.textContent = "Please enter a valid age in years between 0 and 130.";
    bornErrorElement.classList.remove("hide");
    return;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Calculate approximate birth year
  let birthYear = currentYear - age;

  // Check if the user's birthday has passed this year
  const hasHadBirthdayThisYear = (currentDate.getMonth() > 0) || (currentDate.getMonth() === 0 && currentDate.getDate() >= 1);

  // If the user's birthday hasn't occurred yet this year, subtract one more year
  if (!hasHadBirthdayThisYear) {
    birthYear -= 1;
  }

  // Provide feedback based on whether their birthday has passed
  const message = `If your birthday has passed this year, you were born in ${birthYear}. If you haven't had your birthday yet, you were born in ${birthYear + 1}.`;

  // Display the message and hide any previous errors
  bornQuestion.textContent = message;
  bornErrorElement.classList.add("hide");
}


/**
 * Calculates the difference in days between two dates and updates the result on the page.
 * @returns {void}
 */
function calculateDateDifference() {
  const eventDateInput = document.getElementById("eventDate").value;
  const currentDateInput = document.getElementById("currentDate").value;

  // Create Date objects from the input values
  const eventDate = new Date(eventDateInput);
  const currentDate = new Date(currentDateInput || Date.now());

  // Validate dates
  if (isNaN(eventDate.getTime()) || isNaN(currentDate.getTime())) {
    differenceErrorElement.textContent =
      "Please enter valid dates. If no second date is selected, it will default to today's date.";
    differenceErrorElement.classList.remove("hide");
    return;
  }

  // Calculate the difference in time
  const timeDifference = Math.abs(eventDate - currentDate);
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Determine the singular or plural form
  const dayLabel = daysDifference === 1 ? "day" : "days";

  // Adjust text for zero days
  const resultText =
    daysDifference === 0 ? "There are no days between the dates."
      : `There ${
          daysDifference === 1 ? "is" : "are"
        } ${daysDifference} ${dayLabel} between ${eventDate.toDateString()} and ${currentDate.toDateString()}.`;

  // Update the question text and result
  document.getElementById("differenceQuestion").textContent = resultText;

  // Hide error message if no errors
  differenceErrorElement.classList.add("hide");
}

/* global JSConfetti */

// Initialize the confetti settings from JSConfetti
function loadConfettiScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js';
    script.onload = () => resolve(new JSConfetti());
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

let isConfettiRunning = false;

function showConfetti() {
  if (isConfettiRunning) return;

  isConfettiRunning = true;
  loadConfettiScript().then(jsConfetti => {
    jsConfetti.addConfetti({
      emojis: ['⭐','🎊', "🎈",'🎁', '🎂', '🥳'],
      emojiSize: 50,
      confettiNumber: 50,
    });

    setTimeout(() => {
      isConfettiRunning = false;
    }, 2000); // Allow confetti to run again after 2 seconds
  });
}

/**
 * Checks if the user's selected date is their birthday and displays a birthday message and displays a confetti effect if true.
 */
function checkDate() {
  const currentDate = new Date();

  const userDate = new Date(document.getElementById("userDate").value);

  const isBirthday =
    currentDate.getDate() === userDate.getDate() &&
    currentDate.getMonth() === userDate.getMonth();

  if (isBirthday) {
    document.getElementById("ageQuestion").innerHTML += "<br>Happy Birthday!🥳";
    showConfetti();
  }
}