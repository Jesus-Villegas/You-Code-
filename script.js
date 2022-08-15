//Getting all elements 
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

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
    queCounter(que_number);
}

let que_count = 0;
let que_number = 1;

const next_btn = quiz_box.querySelector(".next_btn")

//If Next Button iis clicked 
next_btn.onclick = () => {
    if(que_count < questions.length-1){
    que_count++;
    que_number++;
    showQuestions(que_count);
    queCounter(que_number)
    }else{
        console.log('Questions Completed');
    }

    
}

//getting our questions and options from the array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector(".option_list");
    let que_tag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let option_tag ='<div class = "option"><span>'+ questions[index].options[0] +'</span></div>'
                +   '<div class = "option"><span>'+ questions[index].options[1] +'</span></div>'
                +   '<div class = "option"><span>'+ questions[index].options[2] +'</span></div>'
                +   '<div class = "option"><span>'+ questions[index].options[3] +'</span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag =  '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
