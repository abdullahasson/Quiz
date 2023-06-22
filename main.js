const startBtn = document.querySelector(`.start-btn`);
const popupInfo = document.querySelector(`.popup-info`);
const exitBtn = document.querySelector(`.exit-btn`)
const main = document.querySelector(`.main`)
const continueBtn = document.querySelector(`.continue-btn`)
const quizSection = document.querySelector(`.quiz-section`)
const quizBox = document.querySelector(`.quiz-box`)
const resultBox = document.querySelector(`.result-box`)
const tryAgain = document.querySelector(`.tryAgain-btn`)
const goHome = document.querySelector(`.goHome-btn`)
const icon = document.querySelector(`.listIcon`)
const navbar = document.querySelector(`.main nav`)

icon.onclick = () => {
    navbar.classList.toggle("active")
}


startBtn.onclick = () => {
    popupInfo.classList.add("active")
    main.classList.add("active")
}

exitBtn.onclick = () => {
    popupInfo.classList.remove("active")
    main.classList.remove("active")
}

continueBtn.onclick = () => {
    quizSection.classList.add("active")
    popupInfo.classList.remove("active")
    main.classList.remove("active")
    quizBox.classList.add("active")

    showQuestions(0)
    questionsCounter(1) 
    headerScore()
}


const nextBtn = document.querySelector(`.next-btn`);

tryAgain.onclick = () => {
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount)
    questionsCounter(questionNumber)
    headerScore();
}

goHome.onclick = () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount)
    questionsCounter(questionNumber)
}


let questionCount = 0;
let questionNumber = 1;
let userScore = 0;


nextBtn.onclick = () => {
    if (questionCount < questions.length -1) {
        questionCount++;
        showQuestions(questionCount)
        questionNumber++
        questionsCounter(questionNumber)
    } else {
        showResult()
    }
}

const optionList = document.querySelector(`.option-list`)

function showQuestions(index) {
    const questionText = document.querySelector(`.question-text`)
    questionText.textContent = `${questions[index].numb} . ${questions[index].question}`

    let optionTag = `
    <div class="option">
        <span>${questions[index].option[0]}</span>
    </div>
    <div class="option">
        <span>${questions[index].option[1]}</span>
    </div>
    <div class="option">
        <span>${questions[index].option[2]}</span>
    </div>
    <div class="option">
        <span>${questions[index].option[3]}</span>
    </div>    
    `

    nextBtn.classList.remove("active")

    optionList.innerHTML = optionTag

    var options = document.querySelectorAll(`.option`)
    options.forEach((el) => {
        el.setAttribute('onclick' , 'optionSelected(this)')
    })
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer
    let alloption = optionList.children.length

    if (userAnswer.trim() == correctAnswer) {
        answer.classList.add("correct")
        userScore++
        headerScore()
    } else {
        answer.classList.add("incorrect")

        for(let i = 0; i < alloption; i++) {
            optionList.children[i].classList.add("displayes")
            if ((optionList.children[i].textContent).trim() == correctAnswer) {
                optionList.children[i].classList.add("correct")
            }
        }
    }

    for(let i = 0; i < alloption; i++) {
        optionList.children[i].classList.add("displayes")
    }

    nextBtn.classList.add("active")
}

function questionsCounter(index) {
    const questionTotal = document.querySelector(`.question-total`);
    questionTotal.textContent = `${index} of ${questions.length}`
}

function headerScore() {
    const headerScoreText = document.querySelector(`.header-score`)
    headerScoreText.textContent = `Score ${userScore} / ${questions.length}`
}

function showResult() {
    quizBox.classList.remove('active')
    resultBox.classList.add("active")

    const scoreText = document.querySelector(`.score-text`)
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`


    const cercleProgress = document.querySelector(`.circular-progress`)
    const progressValue = document.querySelector(`.progress-value`)
    let progressStartValue = 0;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 50;

    if (progressEndValue == 0) {
        console.log("sadfasd")
    } else {
        let progress = setInterval(() => {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
    
            cercleProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg , rgba(255 , 255 , 255 , .1) 0deg)`
            if (progressStartValue == progressEndValue) {
                clearInterval(progress)
            }
        } , speed)
    }
}