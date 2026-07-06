const questions=[
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers:[
            { text: "<link>", correct: false},
            { text: "<href>", correct: false},
            { text: "<a>", correct: true},
            { text: "<url>", correct: false}
        ]
    },
    {
        question: "Which CSS property changes the text color?",
        answers:[
            { text: "background-color", correct: false},
            { text: "color", correct: true},
            { text: "font-color", correct: false},
            { text: "text-color", correct: false}
        ]
    },
    {
        question: "Which language is primarily used to add interactivity to a web page?",
        answers:[
            { text: "HTML", correct: false},
            { text: "CSS", correct: false},
            { text: "SQL", correct: false},
            { text: "JavaScript", correct: true}
        ]
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        answers:[
            { text: "<h6>", correct: false},
            { text: "<head>", correct: false},
            { text: "<h1>", correct: true},
            { text: "<heading>", correct: false}
        ]
    },
    {
        question: "Which CSS property is used to add space inside an element's border?",
        answers:[
            { text: "padding", correct: true},
            { text: "margin", correct: false},
            { text: "border-spacing", correct: false},
            { text: "gap", correct: false}
        ]
    },    
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers:[
            { text: "<!-- -->", correct: false},
            { text: "//(single line)", correct: true},
            { text: "/* */ only", correct: false},
            { text: "##", correct: false}
        ]
    },
    {
        question: "Which HTML element is used to insert an image?",
        answers:[
            { text: "<image>", correct: false},
            { text: "<pic>", correct: false},
            { text: "<img>", correct: true},
            { text: "<src>", correct: false}
        ]
    },
    {
        question: "Which CSS property makes text bold?",
        answers:[
            { text: "font-style", correct: false},
            { text: "text-weight", correct: false},
            { text: "bold", correct: false},
            { text: "font-weight", correct: true}
        ]
    },
    {
        question: "What does DOM stands for?",
        answers:[
            { text: "Document Object Model", correct: true},
            { text: "Data Object Model", correct: false},
            { text: "Digital Object Model", correct: false},
            { text: "Document Orientation model", correct: false}
        ]
    },
    {
        question: "Which HTML attribute specifies the URL of an image?",
        answers:[
            { text: "href", correct: false},
            { text: "link", correct: false},
            { text: "src", correct: true},
            { text: "url", correct: false}
        ]
    }
                     
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=> {
        const button=document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("btn"); 
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct; 
        }
        button.addEventListener("click", selectAnswer);
    }); 
}


function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled= "true";
    });
    nextButton.style.display="block";
}


function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
