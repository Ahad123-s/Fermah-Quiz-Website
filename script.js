function selectAnswer(index) {
  selectedAnswers[currentQuestion] = index;

  // Reset all buttons’ background color
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(btn => {
    btn.style.backgroundColor = "#00b36b"; // default button color
  });

  // Highlight the selected button
  buttons[index].style.backgroundColor = "#004d40"; // dark green for selected
}
