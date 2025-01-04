// capture element
let btnStart = document.querySelector('#btnStart');
let btnLevel = Array.from(document.querySelectorAll('.btnChoose'));
let btnLevelEasy = document.querySelector('#btnEasy')
let btnLevelMedium = document.querySelector('#btnMedium')
let btnLevelHard = document.querySelector('#btnHard')
let formGame = document.querySelector('#formGame');
let divQuestion = document.querySelector('#question');
let divAnswers = document.querySelector('#answers');
let btnNextQuestion = document.querySelector('#btnNextQuestion');
let sectionChooselevel = document.querySelector('#sectionChooselevel');


// variables
let score = 0;

fetch('./qa.json').then((response) => response.json()).then((data) => {
    let count = 0;
    let currentQuestion = data[count];
    let correct = currentQuestion.correct;


    function chooseLevel(data) {
        btnLevel.forEach((singleBtn) => {
            singleBtn.addEventListener('click', () => {
                let levelSelected = singleBtn.value;
                let filteredQuestion = data.filter((question) => question.level == levelSelected);
                if (filteredQuestion.length > 0) {
                    count = 0;
                    showQuestion(filteredQuestion);
                    // nextQuestionButton
                    btnNextQuestion.addEventListener('click', () => {
                        nextQuestion(filteredQuestion)
                    });
                } else {
                    console.error('Nessuna domanda trovata per il livello selezionato.');
                }
            });
        })
    }

    function showQuestion(gameData) {
        divQuestion.innerHTML = ``;
        divAnswers.innerHTML = ``;
        // question
        let textQuestion = document.createElement('h4');
        textQuestion.style.color = "blue";
        textQuestion.innerHTML = ` ${gameData[count].question}`;
        divQuestion.appendChild(textQuestion);

        // answers
        gameData[count].answers.forEach((answer, index) => {
            let btnAnswer = document.createElement('button');
            btnAnswer.classList.add('btn', 'btn-dark')
            btnAnswer.innerHTML = ` ${answer}`
            btnAnswer.onclick = () => {
                checkAnswer(index, gameData,btnAnswer)                                 
                btnAnswer.disabled = true
            }
            divAnswers.appendChild(btnAnswer);
        });


    }

    function checkAnswer(selected, data,btn) {
        let correct = data[count].correct;
        console.log(selected);

        if (selected === correct) {
            console.log("giusto!",score);
            score++;
            btn.style.backgroundColor = "green"           
        } else {
            console.log('Errato!');
            btn.style.backgroundColor = "red"
        }

        let allButton = document.querySelectorAll('.btn');
        allButton.forEach((btn)=>{
            btn.disabled = true;
        })

    }

    function nextQuestion(nextData) {
        count++;
        console.log(nextData);

        if (count < nextData.length) {
            showQuestion(nextData)
        }
        else {
            formGame.innerHTML = `<h1> Hai finito il gioco! hai totalizzazto ${score} </h1>`
        }
    }

    btnStart.addEventListener('click', () => {
        sectionChooselevel.classList.add('displaySectionChooseLevelOn')
        sectionChooselevel.classList.remove('displaySectionChooseLevelOff');
        chooseLevel(data)
    });



})
