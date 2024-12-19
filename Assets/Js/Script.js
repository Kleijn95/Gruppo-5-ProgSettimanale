
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
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
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


//Dichiarazione delle variabili
const domande = [];
const risposteEsatte = [];
const risposteSbagliate = [];
const tutteLeRisposte = []; // Questo contiene tutte le risposte
let currentQuestionIndex = 0;
let currentAnswerIndex = 0;
let score = 0;
let chart; // Variabile globale per il grafico della ciambella
let timer; // Variabile globale per il timer
const totalTime = 60; // Tempo totale del timer
let timerDuration = totalTime; // Tempo iniziale del timer
let remainingTime = timerDuration; // Tempo rimanente
let punteggio = localStorage.getItem("score");
punteggio = parseInt(punteggio) || 0; // Gestione punteggio se non definito
let risultatoA = punteggioPercentuale();
let risultatoB = risposteErrate();
let risultatoC = risposteErratePercentuale();
const stelle = document.querySelectorAll('.stelle img');
let clickedIndex = -1; // Variabile per tenere traccia dell'ultima stella cliccata


 // Funzioni Pagina WELCOME

if (document.location.pathname === "/Welcome.html") {
  proceed()                                                            
}


// Funzioni Pagina TEST

if (document.location.pathname === "/Test.html") {
  estrazione(questions);
  createDomanda(questions)                                
  createRisposte();
  startTimer()
  ciambellTimer()
}

// Funzioni Pagina RUSULTS

if (document.location.pathname === "/Results.html") {
  punteggioPercentuale()
  risposteErrate() 
  risposteErratePercentuale()
  rateUs()
  results()
  esitoTest()
  updateChart()
}






//Pagina WELCOME

function proceed() {
  let checkBox = document.querySelector("#promise");
  let buttonProceed = document.querySelector(".proceed");

  buttonProceed.addEventListener("click", function () {
      // Rimuovi eventuali alert precedenti
      let errorMsg = document.querySelector("#error-msg");
      if (errorMsg) {
          errorMsg.remove();
      }

      // Controlla se la checkbox è spuntata
      if (checkBox.checked) {
          window.location.href = "http://127.0.0.1:5500/Test.html";
      } else {
          // Crea l'alert accanto alla checkbox
          let alertBox = document.createElement("div");
          alertBox.id = "error-msg";
          alertBox.textContent = "Spunta la checkbox!";
          checkBox.parentNode.appendChild(alertBox);

          // Rimuovi l'alert dopo 3 secondi
          setTimeout(() => {
              alertBox.remove();
          }, 3000);
      }
  });
}

// Inizializza la funzione


// Pagina TEST


//Estrae domande e risposte dall'array

function estrazione(){
  for(let i=0; i<questions.length; i++){
    domande.push(questions[i].question);
    risposteEsatte.push(questions[i].correct_answer);
    risposteSbagliate.push(questions[i].incorrect_answers);
    tutteLeRisposte.push([questions[i].correct_answer, ...questions[i].incorrect_answers]);
  }
}


//Crea domande

function createDomanda() {   // Funzione per mostrare una domanda
  let container = document.querySelector('.questions');
  container.innerHTML = ''; // Pulisce il contenitore
  let domanda = document.createElement('div');  // Crea un nuovo elemento per la domanda
  domanda.innerText = questions[currentQuestionIndex].question;
  container.appendChild(domanda);  // Aggiungi l'elemento domanda al contenitore
   let questionNum = document.querySelector("#questionNum")
   questionNum.innerHTML = `QUESTION ${currentQuestionIndex + 1}<span class="gradient-text">&nbsp; / &nbsp;10</span>`;
}


//Crea Risposte

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

    button.classList.add("bottone")

    button.onclick = () => { 
     /* let selectedAnswer = tutteLeRisposte[currentAnswerIndex];
      console.log("Risposta selezionata:", selectedAnswer);*/
      checkAnswer(answer);    
}
    buttonContainer.appendChild(button);
}
}


//Verifica Risposte

function checkAnswer(selectedAnswer){
if( selectedAnswer === risposteEsatte[currentQuestionIndex]){
 score++;
 localStorage.setItem("score", score)
}
currentAnswerIndex++;
currentQuestionIndex++;

if(currentQuestionIndex < domande.length){
    
createDomanda();
createRisposte();
startTimer();


}
else {

bottoneProsegui()
}
} 


//Funzione timer

function startTimer() {
  clearInterval(timer); // Ferma eventuali timer precedenti
  timerDuration = totalTime; // Reset del timer
  remainingTime = timerDuration; // Sincronizza la ciambella
  aggiornaCiambella(remainingTime, totalTime); // Aggiorna il grafico

  let tempo = document.querySelector('.timer');
  tempo.innerHTML = `<p class="pTimer">SECONDS</p>
  ${timerDuration}
  <p class="pTimer">REMAINING</p>`;

  timer = setInterval(function () {
    timerDuration--;
    remainingTime = timerDuration; // Sincronizza il tempo rimanente
    aggiornaCiambella(remainingTime, totalTime); // Aggiorna il grafico

    document.querySelector('.timer').innerHTML = `<p class="pTimer">SECONDS</p>
    ${timerDuration}
    <p class="pTimer">REMAINING</p>`;

    if (timerDuration <= 0) {
      clearInterval(timer);
      console.log("Tempo scaduto!");
      checkAnswer(); // Funzione da eseguire quando il timer termina
    }
  }, 1000);
}


//Creazione del bottone allo scadere del tempo o test o completato

function bottoneProsegui() {
 
  console.log("Controllo delle condizioni per il bottone: ", currentQuestionIndex, domande.length - 1, timerDuration);
  if (!document.querySelector(".btn-prosegui")) {
    let footer = document.querySelector("footer");
    let button = document.createElement("button");
    button.innerText = "Vai ai Risultati";
    button.classList.add("btn-prosegui");

   
    button.addEventListener("click", function() {
      window.location.href = "http://127.0.0.1:5500/Results.html"; 
    });

    
    footer.appendChild(button);
  }
}




//Pagina Results


//Punteggi pagina results

function punteggioPercentuale() {
let valoreTotale = 10;
let valoreScore = punteggio
let risultatoA = (valoreScore/valoreTotale)*100
return risultatoA
}

function risposteErrate() {
  let valoreTotale = 10
  let valoreScore = punteggio
  let risultatoB = (valoreTotale - valoreScore)
  return risultatoB
}

function risposteErratePercentuale() {
  let valoreTotale = 10;
  let valoreScore = punteggio
  let risultatoC = ((valoreTotale-valoreScore)/valoreTotale)*100;
  return risultatoC
}


function results() {
  let correctPerc = document.querySelector("#punteggioPercentuale")
  let correctNum = document.querySelector("#score")
  let wrongPerc = document.querySelector("#risposteErratePercentuale")
  let wrongNum = document.querySelector("#risposteErrate")
  
  correctPerc.innerText = `${risultatoA}%`
  correctNum.innerText = `${punteggio}/10 questions`
  wrongPerc.innerText = `${risultatoC}%`
  wrongNum.innerText = `${risultatoB}/10 questions`
}


//Creazione e formattazione del grafico a ciambella in results

function updateChart() {
  let percentCorrect = punteggioPercentuale();
  let percentWrong = risposteErratePercentuale();
  const centerTextPlugin = {
                    id: 'centerText',
                    beforeDraw: (chart) => {
                    const { width, height, ctx } = chart;
                    ctx.save();

    // Calcola il centro del grafico

    const centerX = width / 2;
    const centerY = height / 2;

    // Ottieni il testo e la formattazione in base al punteggio e sostituisci con il punteggio dinamico
    const lines = esitoTest(punteggio);

    // Imposta lo stile e la posizione del testo
    let offsetY = -30; // Offset iniziale per il primo testo

    // Disegna ogni riga con stili diversi
    lines.forEach((line, index) => {
        if (punteggio >= 6) {

            // Test superato
            if (index === 0) {
                // Prima riga: Grassetto bianco
                ctx.font = "bold 20px Outfit, sans-serif";
                ctx.fillStyle = "white";
                
            } else if (index === 1) {
                // Seconda riga: Grassetto rosso
                ctx.font = "bold 20px Outfit, sans-serif";
                ctx.fillStyle = "#00FFFF";
                
            } else {
                // Testo normale, dimensione più piccola
                ctx.font = "14px Outfit, sans-serif";
                ctx.fillStyle = "white";
                
            }
        } else {
            // Test non superato
            if (index === 0) {
                // Prima riga: Grassetto bianco
                ctx.font = "bold 20px Outfit, sans-serif";
                ctx.fillStyle = "white";
            } else {
                // Testo normale, dimensione più piccola
                ctx.font = "16px Outfit, sans-serif";
                ctx.fillStyle = "white";
            }
        }

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(line, centerX, centerY + offsetY);

// Aggiungi uno spazio maggiore solo dopo la seconda riga (You passed the exam.)
if (index === 1 && punteggio >= 6) {
  offsetY += 30; // Aggiungi uno spazio maggiore dopo la seconda riga
} else {
  offsetY += 20; // Altezza tra le righe per le altre
}
});

ctx.restore();
}
};

// Configurazione dei dati del grafico
const data = {
  labels: [],
  datasets: [{
      data: [percentWrong, percentCorrect],
      backgroundColor: ['#c2128c', '#00FFFF'],
      hoverOffset: 4
  }]
};

// Configurazione grafica generale del grafico
const config = {
  type: 'doughnut',
  data: data,
  options: {
      responsive: true,
      borderWidth: 0,
      cutout: "75%",
      plugins: {
          legend: {
              display: true,
              position: 'top'
          }
      }
  },
  plugins: [centerTextPlugin]
};

// Creazione del grafico
const myDoughnutChart = new Chart(
  document.getElementById('myChart'),
  config
);
}

//Scrive il messaggio nel grafico di results

function esitoTest() {
  if (punteggio >= 6) {
    return [
        "Congratulations!",           // Prima riga (bianco, grassetto)
        "You passed the exam.",       // Seconda riga (rosso, grassetto)
        
        "We'll send you the certificate", // Testo normale (bianco)
        "in a few minutes.",          // Testo normale (bianco)
        "Check your email (including", // Testo normale (bianco)
        "promotion/spam folder)."     // Testo normale (bianco)
    ];
  } else {
    return [
        "Unlucky!",                   // Prima riga (bianco, grassetto)
        "You didn't pass the exam.",  // Seconda riga (bianco, normale)
        "But you can try again soon!" // Testo normale (bianco)
    ];
  }
  }
  




//Pagina Review


// Creazione ed illuminazione delle stelle

  stelle.forEach((stella, index) => {
      // Evento per il passaggio del mouse
      stella.addEventListener('mouseover', () => {
          // Aggiungi la classe "active" a tutte le stelle fino all'indice corrente
          stelle.forEach((s, i) => {
              if (i <= index) {
                  s.classList.add('active');
              } else {
                  s.classList.remove('active');
              }
          });
      });
  
      // Evento per rimuovere l'illuminazione al passaggio del mouse
      stella.addEventListener('mouseout', () => {
          stelle.forEach((s, i) => {
              // Rimuove l'effetto hover se non è cliccata
              if (i > clickedIndex) {
                  s.classList.remove('active');
              }
          });
      });
  
      // Evento per il clic
      stella.addEventListener('click', () => {
          clickedIndex = index; // Memorizza l'indice della stella cliccata
          stelle.forEach((s, i) => {
              if (i <= clickedIndex) {
                  s.classList.add('active'); // Mantiene le stelle illuminate
              } else {
                  s.classList.remove('active'); // Oscura quelle successive
              }
          });
      });
  });



//

function rateUs() {
  let rateUs = document.querySelector("#rateUs")
  rateUs.addEventListener("click", function(){
    window.location.href = "http://127.0.0.1:5500/Review.html"})}

  

    function ciambellTimer() {
    
   
      const ctx = document.getElementById("timerChart").getContext("2d");
    
    let totalTime = 60; // Tempo totale del timer in secondi
    let remainingTime = totalTime; // Tempo rimanente
    
    // Crea il grafico iniziale
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Tempo rimanente", "Tempo trascorso"],
        datasets: [
          {
            label: "Timer",
            data: [remainingTime, totalTime - remainingTime],
            backgroundColor: ["#00FFFF", "#e0e0e0"],
            borderWidth: 0, // Nessun bordo
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "70%", // Per creare un anello più spesso
        plugins: {
          legend: {
            display: false, // Nascondi legenda
          },
          tooltip: {
            enabled: false, // Nascondi tooltip
          },
        },
      },
    });
    
    // Aggiorna il grafico ogni secondo
    const interval = setInterval(() => {
      remainingTime--;
    
      // Aggiorna i dati del grafico
      chart.data.datasets[0].data = [remainingTime, totalTime - remainingTime];
      chart.update();
    
      // Controlla se il timer è terminato
      if (remainingTime <= 0) {
        clearInterval(interval);
        console.log("Tempo scaduto!");
      }
    }, 1000);}


















  //Protototipi ed idee


  // const data = {
      
    //   datasets: [
    //     {
    //       label: 'Test Results',
    //       data: [percentWrong,percentCorrect],
    //       // backgroundColor: [
    //       //   // percentCorrect >= 80 ? '#00FFFF' : '#00FFFF', // Verde se il punteggio è 80% o più
    //       //   // percentWrong >= 80 ? '#c2128c' : '#c2128c'    // Rosso se le risposte errate sono più del 80%
    //       //   percentCorrect= '#c2128c',
    //       //   percentWrong=   '#00FFFF'
    //       // ],
    //       backgroundColor: [
    //         '#c2128c', // Rosa per le risposte sbagliate
    //         '#00FFFF'  // Azzurro per le risposte corrette
    //       ],
    //     }
    //   ]
    // };
  //   const ctx = document.getElementById('myChart').getContext('2d');
  //   new Chart(ctx, {
  //     type: 'doughnut',
  //     data: data,
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: true,
  //       borderWidth: 0,
  //       cutout: "75%",
  //       plugins: {
          
  //         centerTextPlugin: {
  //           id: 'centerText',
  //           beforeDraw: (chart) => {
  //               const {width} = chart;
  //               const {height} = chart;
  //               const ctx = chart.ctx;

  //               ctx.save();

  //               // Imposta lo stile del testo
  //               ctx.font = '20px Arial';
  //               ctx.fillStyle = 'black';
  //               ctx.textAlign = 'center';
  //               ctx.textBaseline = 'middle';

  //               // Calcola le coordinate del centro
  //               const centerX = width / 2;
  //               const centerY = height / 2;

  //               // Testo da visualizzare
  //               const text = 'Ciao, Chart.js!';

  //               // Disegna il testo al centro
  //               ctx.fillText(text, centerX, centerY);

  //               ctx.restore();
  //           }
        
  //         }
  //       }
  //     }
  //   });
  // Funzione per creare la ciambella
function ciambellTimer() {
  const ctx = document.getElementById("timerChart").getContext("2d");

  // Crea il grafico iniziale
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Tempo rimanente", "Tempo trascorso"],
      datasets: [
        {
          label: "Timer",
          data: [remainingTime, totalTime - remainingTime],
          backgroundColor: ["#00FFFF", "#e0e0e0"],
          borderWidth: 0, // Nessun bordo
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "70%", // Per creare un anello più spesso
     
      
      plugins: {
        legend: {
          display: false, // Nascondi legenda
        },
        tooltip: {
          enabled: false, // Nascondi tooltip
        },
      },
    },
  });
}

// Funzione per aggiornare il grafico
function aggiornaCiambella(remainingTime, totalTime) {
  if (chart) {
    chart.data.datasets[0].data = [remainingTime, totalTime - remainingTime];
    chart.update();
  }
}