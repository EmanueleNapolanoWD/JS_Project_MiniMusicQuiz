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
let sectionGame = document.querySelector('#sectionGame');
let btnExitGame = document.querySelector('#btnExitGame');
let btnRieviwGame = document.querySelector('#btnRieviwGame');


// variables
let score = 0;

fetch('./qa.json').then((response) => response.json()).then((data) => {
    let count = 0;

    // Choose Level and Play
    function chooseLevel(data) {
        count = 0;
        // button Level
        btnLevel.forEach((singleBtn) => {
            singleBtn.addEventListener('click', () => {
                // reset Question filtrate;
                let filteredQuestion = [];
                sectionGame.style.display = "block";
                let levelSelected = singleBtn.value;
                filteredQuestion = data.filter((question) => question.level == levelSelected);
                console.log(filteredQuestion, count);
                if (filteredQuestion.length > 0) {
                    sectionChooselevel.classList.remove('displaySectionChooseLevelOn')
                    sectionChooselevel.classList.add('displaySectionChooseLevelOff')
                    showQuestion(filteredQuestion);
                    btnNextQuestion.addEventListener('click',()=>{
                        nextQuestion(filteredQuestion)
                    } );

                } else {
                    console.error('Nessuna domanda trovata per il livello selezionato.');
                }

            });
        })
    }


    // function Show Questions&Answers
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
            btnAnswer.classList.add('btnAnswers')
            btnAnswer.innerHTML = ` ${answer}`
            btnAnswer.onclick = () => {
                checkAnswer(index, gameData, btnAnswer)
            }
            divAnswers.appendChild(btnAnswer);
        });
    }


    // function control answer
    function checkAnswer(selected, data, btn) {
        let correct = data[count].correct;
        console.log(selected);

        if (selected === correct) {
            console.log("giusto!", score);
            score++;
            btn.style.backgroundColor = "green"
        } else {
            console.log('Errato!');
            btn.style.backgroundColor = "red"
        }

        let allButton = document.querySelectorAll('.btnAnswers');
        allButton.forEach((btn) => {
            btn.disabled = true;
        })

    }

    function nextQuestion(nextData) {
        count++;
        console.log(nextData.length);
        if (count < nextData.length) {
            showQuestion(nextData)
            console.log(count);
        }
        else {
            formGame.innerHTML = `<h1> Hai finito il gioco! hai totalizzazto ${score} su ${nextData.length} </h1>`
        }
    }



    btnExitGame.addEventListener('click', () => {
        sectionChooselevel.classList.remove('displaySectionChooseLevelOn')
        sectionChooselevel.classList.add('displaySectionChooseLevelOff');
        sectionGame.style.display = "none";
        btnStart.disabled = false;
        score = 0;
        count = 0;
    });

    btnRieviwGame.addEventListener('click', () => {
        sectionChooselevel.classList.add('displaySectionChooseLevelOn')
        sectionChooselevel.classList.remove('displaySectionChooseLevelOff');
        sectionGame.style.display = "none";
        score = 0;
        count = 0;
    });

    btnStart.addEventListener('click', () => {
        sectionChooselevel.classList.add('displaySectionChooseLevelOn')
        sectionChooselevel.classList.remove('displaySectionChooseLevelOff');
        score = 0;
        count = 0;
        chooseLevel(data);
    });
});














