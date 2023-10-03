const questionContainer = document.getElementById("question-container");
const suggestionContainer = document.getElementById("suggestions-container"); // Ensure the ID matches with the HTML element's ID

let currentQuestionIndex = 0;
let questions; // Renamed the variable to 'questions' for clarity

// Fetch the JSON data when the page loads
fetch("questions.json")  // Changed the path to a relative path
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        questions = data; // Corrected the variable name to 'questions'
        displayQuestion();
    })
    .catch((error) => {
        console.error("Error fetching questions:", error);
    });

function displayQuestion() {
    if (questions && questions.length > currentQuestionIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const { question, option } = currentQuestion; 

        questionContainer.textContent = question;

        const answerButtons = option.map((option, index) => {  
            const button = document.createElement("button");
            button.textContent = option.answer; 
            button.addEventListener("click", () => handleAnswerClick(option, index));
            return button;
        });

        // Clear any previous answer buttons and add the new ones
        questionContainer.innerHTML = ""; // Clear previous content
        answerButtons.forEach((button) => questionContainer.appendChild(button));

        suggestionContainer.textContent = ""; // Clear suggestion
    } else {
        suggestionContainer.textContent = "Thank you for using the self-care manual!";
    }
}

function handleAnswerClick(option, index) { 
    const response = option.response;
    const suggestions = option.suggestion;

    suggestionContainer.textContent = response;

    // Check if the user's response should end the questionnaire
    const confirmResponse = confirm("Do you want to continue?");

    if (confirmResponse) {
        const randomIndex = Math.floor(Math.random() * suggestions.length); 
        suggestionContainer.textContent += ' - ' + suggestions[randomIndex]; 

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            suggestionContainer.textContent = "You've completed the questionnaire!"; 
        }
    } else {
        suggestionContainer.textContent = "Thank you for using the self-care manual!";
    }
}

// Start the questionnaire by displaying the first question
displayQuestion();