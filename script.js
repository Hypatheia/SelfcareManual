let quizData = [];  // Array to store the quiz data
let firstQuestion = null;  // Variable to store the first question
let remainingQuestions = [];  // Variable to store the remaining questions

// Function to fetch the quiz data from questions.json
async function fetchQuizData() {
    showLoadingIndicator();
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        quizData = await response.json();
        firstQuestion = quizData[0];  // Separate the first question
        remainingQuestions = quizData.slice(1);  // Separate the remaining questions
        shuffle(remainingQuestions);  // Shuffle the remaining questions
        hideLoadingIndicator();
        showQuestion(firstQuestion);  // Start the quiz once the data is loaded
    } catch (error) {
        console.error('Failed to fetch quiz data:', error);
        showError(error);
        hideLoadingIndicator();
    }
}

function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'none';
}

function showError(error) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';  // Clear the previous content
    const errorElement = document.createElement('p');
    errorElement.innerText = `Error: ${error.message}`;
    quizContainer.appendChild(errorElement);
}

function showQuestion(questionData) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';  // Clear the previous content

    const imageElement = document.getElementById('dynamic-image');
    imageElement.src = '/images/frog_normal.png';  // Reset image to default

    if (!questionData) {  // No more questions, display the end message
        displayEndMessage();
        return;
    }

    // Displaying the question
    const questionElement = document.createElement('p');
    questionElement.innerText = questionData.question;
    quizContainer.appendChild(questionElement);

    // Displaying the answers
    questionData.option.forEach((option, index) => {
        const answerButton = document.createElement('button');
        answerButton.innerText = option.answer;
        answerButton.classList.add('answer-btn');
        answerButton.onclick = () => showResponse(questionData, index);
        quizContainer.appendChild(answerButton);
    });
}

function restartQuiz() {
    remainingQuestions = quizData.slice(1);  // Reset the remaining questions
    shuffle(remainingQuestions);  // Shuffle the questions again
    showQuestion(firstQuestion);  // Start the quiz over with the first question
}

function showResponse(questionData, answerIndex) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';  // Clear the previous content

    const responseSection = document.createElement('div');
    responseSection.classList.add('response-section');
    quizContainer.appendChild(responseSection);

    const responseElement = document.createElement('p');
    responseElement.innerText = questionData.option[answerIndex].response;
    responseSection.appendChild(responseElement);

    const suggestionSection = document.createElement('div');
    suggestionSection.classList.add('suggestion-section');
    quizContainer.appendChild(suggestionSection);

    const suggestionElement = document.createElement('p');
    const randomSuggestion = questionData.option[answerIndex].suggestions[Math.floor(Math.random() * questionData.option[answerIndex].suggestions.length)];
    suggestionElement.innerText = randomSuggestion;
    suggestionSection.appendChild(suggestionElement);

    const imageElement = document.getElementById('dynamic-image');
    if (questionData.option[answerIndex].isHappy) {
        imageElement.src = '/images/frog_happy.png';
    }

    const continueButton = document.createElement('button');
    continueButton.innerText = 'Continue';
    continueButton.classList.add('nav-btn');
    continueButton.onclick = () => {
        const nextQuestion = remainingQuestions.pop();
        showQuestion(nextQuestion);
    };
    responseSection.appendChild(continueButton);

    const exitButton = document.createElement('button');
    exitButton.innerText = 'Exit';
    exitButton.classList.add('nav-btn');
    exitButton.onclick = endQuiz;
    responseSection.appendChild(exitButton);
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayEndMessage() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const endMessageElement = document.createElement('p');
    endMessageElement.innerText = 'Great job taking care of yourself!\n\nWishing you a wonderful day filled with positivity and self-care.\n\nRemember, you deserve it!';
    quizContainer.appendChild(endMessageElement);

    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Quiz';
    restartButton.classList.add('nav-btn');
    restartButton.onclick = restartQuiz;
    quizContainer.appendChild(restartButton);
}

function endQuiz() {
    displayEndMessage();
}

function startQuiz() {
    if (firstQuestion) {
        showQuestion(firstQuestion);
    } else {
        fetchQuizData();
    }
}