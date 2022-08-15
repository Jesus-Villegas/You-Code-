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
}