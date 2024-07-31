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
