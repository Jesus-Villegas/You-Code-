//Getting all elements 
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
// const timeLine = quiz_box.querySelector("header .timer_line");

const option_list = document.querySelector(".option_list");

//Start Quiz Button Click 
start_btn.onclick=()=>{
    info_box.classList.add("activeInfo"); // Shows the info box
    console.log("works");
}

//If Exit Button Clicked
exit_btn.onclick =()=>{
    info_box.classList.remove("activeInfo"); // Hiide the info box
}

//If Continue Button Clicked
continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo"); // Hiide the info box
    quiz_box.classList.add("activeQuiz"); // Show the quiz box
    console.log("works");
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
    // startTimerLine(0);
       next_btn.style.display = 'none';
}

let que_count = 0;
let que_number = 1;
let  counter;
let timeValue = 30;
let userScore = 0;
let userName = "";
// let widthValue = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz =result_box.querySelector(".buttons .restart");
const quit_quiz =result_box.querySelector(".buttons .quit");


restart_quiz.onclick = () => {
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_number = 1;
    let timeValue = 30;
    let userScore = 0;
    que_count++;
    que_number++;
    showQuestions(que_count);
    queCounter(que_number);
    clearInterval(counter);
    startTimer(timeValue);
    next_btn.style.display = 'none';
    
}

quit_quiz.onclick = () => {
    window.localStorage.reload();
    saveScores();
}


//If Next Button iis clicked 
next_btn.onclick = () => {
    if(que_count < questions.length-1){
        que_count++;
        que_number++;
        showQuestions(que_count);
        queCounter(que_number);
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = 'none';
        // clearInterval(counterLine);
        // startTimerLine(widthValue);
    }else{
        console.log('Questions Completed');
        showResultBox();
    }

    
}

//getting our questions and options from the array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let option_tag ='<div class = "option"><span>'+ questions[index].options[0] +'</span></div>'
                +   '<div class = "option"><span>'+ questions[index].options[1] +'</span></div>'
                +   '<div class = "option"><span>'+ questions[index].options[2] +'</span></div>'
                +   '<div class = "option"><span>'+ questions[index].options[3] +'</span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', "optionSelected(this)");
    }
}

let  tickIcon ='<div class="icon tick"><i class="fas fa-check"></i></div>';
let  crossIcon ='<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    let allOptions = option_list.children.length;  
    if(userAnswer == correctAnswer){
        answer.classList.add("correct");
        console.log("Your answer was correct");
        userScore   += 1;
        answer.insertAdjacentHTML('beforeend',tickIcon);
        timeValue = timeValue + 10;
        console.log(timeValue);
        
    }
    if(userAnswer !== correctAnswer){
        answer.classList.add("wrong");
        console.log("Your answer was wrong");
        answer.insertAdjacentHTML('beforeend',crossIcon);
        timeValue = timeValue - 10;
        console.log(timeValue);


        //If answer is wrong then automatically select the answer
        for(let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAnswer){
            option_list.children[i].setAttribute('class', 'option correct');
            option_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
            }
        }
    }
    //once the user selected an option, disable the rest
    for (let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = 'block';
}

function saveScores() {
    username = prompt("What is your username?");
    localStorage.setItem("score", JSON.stringify(userScore));

}

function showResultBox(){
    info_box.classList.add("activeInfo"); // Shows the info box
    quiz_box.classList.remove("activeQuiz"); // hide the quiz box
    result_box.classList.add("activeResult"); // Shows the result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){
        let scoreTag = '<span>and congrats!, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 3){
        let scoreTag = '<span>and nice, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}




function startTimer(time) { 
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = '0' + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = '00';

            let correctAnswer = questions[que_count].answer;
            let allOptions = option_list.children.length;  
            for(let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAnswer){
                option_list.children[i].setAttribute('class', 'option correct');
                option_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
                }
                for (let i = 0; i < allOptions; i++){
                    option_list.children[i].classList.add("disabled");
                }
                next_btn.style.display = 'block';
            }
        }
    }
}

// function startTimerLine(time) { 
//     counterLine = setInterval(timer,29);
//     function timer(){
//         time += 1;
//         timeLine.style.width = time + 'px';
//         if(time > 549){
//             clearInterval(counterLine);
//         }
//     }
// }

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag =  '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
