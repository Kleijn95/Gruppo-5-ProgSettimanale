
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//CSS

//Dichiarazione delle variabili
const domande=[];
const risposteEsatte=[];
const risposteSbagliate=[];
const tutteLeRisposte=[];  //Questo contiene tutte le risposte
let currentQuestionIndex = 0;
let currentAnswerIndex = 0;
let score = 0;


//Estrae domande e risposte dall'array

function estrazione(){
    for(let i=0; i<questions.length; i++){
      domande.push(questions[i].question);
      risposteEsatte.push(questions[i].correct_answer);
      risposteSbagliate.push(questions[i].incorrect_answers);
      tutteLeRisposte.push([questions[i].correct_answer, ...questions[i].incorrect_answers]);
    }
  }
  
  

  /*
    console.log(domande)// qui abbiamo l'array con l'elenco delle domande
    console.log(risposteEsatte)
    console.log(risposteSbagliate)
    console.log(tutteLeRisposte)*/


function createDomanda() {   // Funzione per mostrare una domanda
    let container = document.querySelector('.questions');
    container.innerHTML = ''; // Pulisce il contenitore
    let domanda = document.createElement('div');  // Crea un nuovo elemento per la domanda
    domanda.innerText = questions[currentQuestionIndex].question;
    container.appendChild(domanda);  // Aggiungi l'elemento domanda al contenitore
    
}

createDomanda(questions)




function createRisposte() {   
  let buttonContainer = document.querySelector(".buttonContainer"); 
  buttonContainer.innerHTML = '';  // Svuota il contenitore prima di aggiungere nuovi pulsanti
  // Crea un pulsante per ogni risposta
  tutteLeRisposte[currentAnswerIndex].sort(()=> Math.random() - 0.5);

  /* let risposteMescolate = [...tutteLeRisposte[currentAnswerIndex]];
  risposteMescolate.sort(() => Math.random() - 0.5);*/

  for (let i = 0; i < tutteLeRisposte[currentAnswerIndex].length; i++) {
      let answer = tutteLeRisposte[currentAnswerIndex][i]; 
      let button = document.createElement("button");
      button.innerText = answer;
      
      
      button.onclick = () => { 
       /* let selectedAnswer = tutteLeRisposte[currentAnswerIndex];
        console.log("Risposta selezionata:", selectedAnswer);*/
        checkAnswer(answer);    
  }
      buttonContainer.appendChild(button);
}
}

createRisposte();


function checkAnswer(selectedAnswer){
if( selectedAnswer === risposteEsatte[currentQuestionIndex]){
   score++;
}
 currentAnswerIndex++;
 currentQuestionIndex++;

 if(currentQuestionIndex < domande.length){
      
  createDomanda();
  createRisposte();
  startTimer();

 }
} 

let timer;
let timerDuration= 60;

function startTimer() {
  clearInterval(timer)
  timerDuration= 60;
  let tempo = document.querySelector('.timer')
  tempo.innerText = timerDuration
  timer = setInterval(function() {
  timerDuration--;
  document.querySelector('.timer').innerText = timerDuration;
  if (timerDuration<=0) {
  clearInterval(timer)
  checkAnswer();
 }
}, 1000)
}

startTimer()



