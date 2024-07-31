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
