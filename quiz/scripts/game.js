const question = document.querySelector('#questiones');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progressBar-full');

let currentQuestion = {};
let aceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:"Assinale a alternativa que contém as principais fontes ou tipos de energia renováveis",
        choice1: "Carvão mineral, energia nuclear, biomassa e hidroelétrica",
        choice2: "Solar, gás natural, biomassa e eólica",
        choice3: "Biomassa, solar, hidroelétrica e geotérmica",
        choice4: "Carvão mineral, solar, eólica e energia das marés",
        answer: 3,
    },
    {
        question: "Quais regiões do Brasil apresentam um elevado potencial eólico?",
        choice1: "Norte e Sudeste",
        choice2: "Nordeste e Sul",
        choice3: "Sudeste e Sul.",
        choice4: "Centro-Oeste e Sul",
        answer: 2,
    },
    {
        question: "Assinale a alternativa em que contém somente fontes não renováveis de energia.",
        choice1: "Carvão mineral, energia solar, energia geotérmica e xisto betuminoso.",
        choice2: "Nafta petroquímica, carvão mineral, hidrelétrica e gás natural.",
        choice3: "Petróleo, gás natural, energia geotérmica e carvão mineral.",
        choice4: "Petróleo, carvão mineral, gás natural e xisto betuminoso.",
        answer: 4,
    },
    {
        question: "Qual das seguintes fontes de produção de energia é a mais recomendável para a diminuição dos gases causadores do aquecimento global?",
        choice1: "Carvão mineral.",
        choice2: "Gás natural",
        choice3: "Óleo diesel.",
        choice4: "Vento",
        answer: 4,
    },
    {
        question: "Atualmente, o país que mais possui usinas atômicas e o que mais depende da energia nuclear, respectivamente, são:",
        choice1: "Estados Unidos e França",
        choice2: "França e Japão.",
        choice3: "Estados Unidos e Japão.",
        choice4: "Japão e França.",
        answer: 1,
    },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('./end.html');
    };

    questionCounter ++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    aceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!aceptingAnswers) return;

        aceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();

