let quizData = [];  // Global variable to store the quiz data
let currentQuestionIndex = 0;

// Function to fetch the quiz data from questions.json
async function fetchQuizData() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        quizData = await response.json();
        showQuestion();  // Start the quiz once the data is loaded
    } catch (error) {
        console.error('Failed to fetch quiz data:', error);
    }
}

function showQuestion() {
    const questionData = quizData[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz-container');

    // Clearing the previous content
    quizContainer.innerHTML = '';

    // Displaying the question
    const questionElement = document.createElement('p');
    questionElement.innerText = questionData.question;
    quizContainer.appendChild(questionElement);

    // Displaying the answers
    questionData.option.forEach((option, index) => {
        const answerButton = document.createElement('button');
        answerButton.innerText = option.answer;
        answerButton.classList.add('answer-btn');
        answerButton.onclick = () => showResponse(index);
        quizContainer.appendChild(answerButton);
    });
}

function showResponse(answerIndex) {
    const questionData = quizData[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz-container');

    // Clearing the previous content
    quizContainer.innerHTML = '';

    // Displaying the response
    const responseElement = document.createElement('p');
    responseElement.innerText = questionData.option[answerIndex].response;
    quizContainer.appendChild(responseElement);

    // Displaying a random suggestion
    const suggestionElement = document.createElement('p');
    const randomSuggestion = questionData.option[answerIndex].suggestions[Math.floor(Math.random() * questionData.option[answerIndex].suggestions.length)];
    suggestionElement.innerText = randomSuggestion;
    quizContainer.appendChild(suggestionElement);

    // Asking the user if they want to continue
    const continueButton = document.createElement('button');
    continueButton.innerText = 'Continue';
    continueButton.classList.add('nav-btn');
    continueButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();  // Show the next question
        } else {
            endQuiz();  // End the quiz if there are no more questions
        }
    };
    quizContainer.appendChild(continueButton);

    // Adding a button to exit the quiz
    const exitButton = document.createElement('button');
    exitButton.innerText = 'Exit';
    exitButton.classList.add('nav-btn');
    exitButton.onclick = endQuiz;
    quizContainer.appendChild(exitButton);
}

function endQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '<button id="start-button" class="nav-btn" onclick="startQuiz()">Start Quiz</button>';
}

function startQuiz() {
    if (quizData.length > 0) {
        showQuestion();
    } else {
        fetchQuizData();  // Fetch the quiz data if it hasn't been loaded yet
    }
}

// If you want to automatically start the quiz when the page loads,
// uncomment the line below. Otherwise, the quiz will start when
// the user clicks the "Start Quiz" button.
// fetchQuizData();
