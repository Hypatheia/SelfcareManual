const questionContainer = document.getElementById("question-container");
const suggestionContainer = document.getElementById("suggestions-container");
const continueButton = document.getElementById("continue-button");

let currentQuestionIndex = 0;
let questions; // This variable will hold the fetched question data
let currentQuestion;

// Fetch the JSON data when the page loads
fetch("/Users/nathaly/GitHub/Projects/SelfcareManual/questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    console.log(questions);
    displayQuestion();
  })
  .catch((error) => {
    console.error("Error fetching questions:", error);
  });

// Function to display question, answers, responses, and suggestions
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        currentQuestion = questions[currentQuestionIndex]; // Assign the current question

        const { question, options } = currentQuestion;

        questionContainer.textContent = question;

        const answerButtons = options.map((option, index) => {
            const button = document.createElement("button");
            button.textContent = option.answers;
            button.addEventListener("click", () => handleAnswerClick(index));
            return button;
        });

        // Clear any previous answer buttons and add the new ones
        suggestionContainer.textContent = ""; // Clear suggestion
        continueButton.style.display = "none"; // Hide the continue button

        questionContainer.innerHTML = ""; // Clear previous content
        answerButtons.forEach((button) => questionContainer.appendChild(button));

        console.log("Current question:", currentQuestion);
    } else {
        // Handle the case where there are no more questions
        questionContainer.textContent = "Thank you for using the self-care manual!";
        continueButton.style.display = "none"; // Hide the continue button
        suggestionContainer.textContent = ""; // Clear suggestion
    }
}

// Function to display a random suggestion
function displayRandomSuggestion(suggestions) {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    suggestionContainer.textContent = suggestions[randomIndex];
}

// Function to handle user's answer click
function handleAnswerClick(answerIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const option = currentQuestion.options[answerIndex];
    const response = option.responses;
    const suggestions = option.suggestions;

    displayResponse(response);

    // Check if the user's response should end the questionnaire
    const confirmResponse = confirm("Do you want to continue?");

    if (confirmResponse) {
        displayRandomSuggestion(suggestions);
        currentQuestionIndex++;
        displayQuestion(); // Display the next question
        continueButton.style.display = "none"; // Hide the continue button
    } else {
        // User does not want to continue, you can handle this as needed
        suggestionContainer.textContent = "Thank you for using the self-care manual!";
        continueButton.style.display = "none"; // Hide the continue button
    }
}

// Function to display a response
function displayResponse(response) {
    suggestionContainer.textContent = response;
}

// Function to handle the "Continue" button click
continueButton.addEventListener("click", () => {
    currentQuestionIndex++;
    displayQuestion(); // Display the next question
});
  
  // Start the questionnaire by displaying the first question
  displayQuestion();