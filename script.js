const questions=[
    {
        question:"which is largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"elephant",correct:false},
            {text:"Giraffe",correct:false},

        ]
    },
    {
        question:"which is largest desert in the world?",
        answers:[
            {text:"kolahari",correct:false},
            {text:"gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"antarctica",correct:true},

        ]
    },
    {
        question:"which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"australia",correct:true},
            {text:"arctic",correct:false},
            {text:"africa",correct:false},

        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
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
    let questionNo=currentQuestionIndex +1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

//to display the answers(in button so first we create btn)
currentQuestion.answers.forEach(answer=>{
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");

    }
    // to disappear the bg colour when selected
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");

        }
        button.disabled=true;

    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score}out of ${questions.length}`;
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();

    }
})
startQuiz();