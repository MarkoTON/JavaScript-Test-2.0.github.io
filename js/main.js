// Answeres
let validAnsweres = [];
//// Geting Questions
getQuestionsJSON();
function getQuestionsJSON(){
  // Hvatanje JSON-a i konvertovanje
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(xhttp.responseText);
      let questions = response[0];
      // console.log(questions.testQuestions);
      for(let i = 0; i < questions.testQuestions.length; i++){
        validAnsweres.push(questions.testQuestions[i].rightAnswer);
        
        printQuestions(questions.testQuestions[i].question, questions.testQuestions[i].id, i+1)
      }
      console.log(validAnsweres);
    }
  };
  xhttp.open("GET", "json/question.json", true);
  xhttp.send();
}

// Defining HTML and printing Questions in Index.html
function printQuestions(getQuestion, getQuestionsID, getNumberQuestion){
  let question = getQuestion;
  let questionsID = getQuestionsID;
  let NumberQuestion = getNumberQuestion;
  // Get HTML element
  let pageHTML = document.querySelector(".test_questions");
  // console.log(pageHTML);
  // Printing UI
  // console.log(questionsID);
  pageHTML.innerHTML +=
  `
  <div class="question my-3">
  <h3 class="question__title py-3">
    ${NumberQuestion}. ${question}
  </h3>
  <div class="question__body" id="${questionsID}">
  
  </div>
  </div>
  `;
}

//// Geting Answeres
getAnsweresJSON();
function getAnsweresJSON(){
  // Hvatanje JSON-a i konvertovanje
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(xhttp.responseText);
      let questions = response[0];
      
      for(let i = 0; i < questions.offeredAnswers.length; i++){
        // console.log(questions.offeredAnswers[i]);
        let id = i+1;
        // console.log(id);
        questions.offeredAnswers[i].forEach(element => {
          document.getElementById("q"+ id).innerHTML += `<input type="radio" class="my-1" name="q${id}" value="${element}"> <p class="d-inline-block mb-1 pl-2">${element}</p><br>`;
          // console.log(id);
        });
      }
    }
  };
  xhttp.open("GET", "json/question.json", true);
  xhttp.send();
}

let form = document.getElementsByTagName("form")[0].addEventListener("submit", testValue);

function testValue(e){
  let inputRadio = document.querySelectorAll("input[type='radio']:checked");
  let score = 0;
  
  for(let i = 0; i < 5 ; i++){
    if(validateRadio(document.forms["0"]["q"+(i+1)]) == null || validateRadio(document.forms["0"]["q"+(i+1)]) == ''){
      alert('Please answer all question ' + "q"+ (i+1));
      return false;
    }
  }
  
  for(let k = 0; k < validAnsweres.length; k++){
    for(let i = 0; i < inputRadio.length; i++){
      // console.log(inputRadio[i].value)
      if(String(validAnsweres[k]) == String(inputRadio[i].value)){
        score++
      }
    }
  }

  printScore(score);
  
  e.preventDefault();
}

function printScore(score){
  document.getElementById("score").innerHTML =
  `
  <h1 class="m-0 score--text">Your score is ${score} out of 5</h1>
  `;
}

function validateRadio (radios){
  for (i = 0; i < radios.length; ++ i){
    if (radios [i].checked) return true;
  }
  return false;
}