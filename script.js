// capture element
let btnStart = document.querySelector('#btnStart');
let formGame = document.querySelector('#formGame');
let divQuestion = document.querySelector('#question');
let divAnswers = document.querySelector('#answers');
let btnNextQuestion = document.querySelector('#btnNextQuestion');

// variables
let score = 0;

fetch('./qa.json').then((response) => response.json()).then((data) => {
    let count = 0;
    let currentQuestion = data[count];
    let correct = currentQuestion.correct;



    function showQuestion(data) {
        divQuestion.innerHTML = ``;
        divAnswers.innerHTML = ``;

        // question
        let textQuestion = document.createElement('h4');
        textQuestion.style.color = "blue";
        textQuestion.innerHTML = ` ${data.question}`;
        divQuestion.appendChild(textQuestion);        

        // answers
        data.answers.forEach((answer,index) => {
            let btnAnswer = document.createElement('button');
            btnAnswer.innerHTML = ` ${answer}`
            btnAnswer.onclick = ()=>{
                checkAnswer(index)
            }
            divAnswers.appendChild(btnAnswer);
        });
        
        // nextQuestionButton
        btnNextQuestion.addEventListener('click',nextQuestion);
        

    }

    function checkAnswer(selected){
        let correct = data[count].correct;
        console.log(selected);
        
        if(selected === correct){
            console.log("giusto!");            
        }else{
            console.log('Errato!');            
        }

    }

    function nextQuestion() {
        count = count+1;
        if (count < data.length){
            
            showQuestion(data[count])
        }
        else{
           formGame.innerHTML = `<h1> Hai finito il gioco! </h1>`         
        }
    }

    showQuestion(currentQuestion);

})
