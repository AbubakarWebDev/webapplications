
// For Checking checkbox one at a time and also when checkbox is checked its bg color is changed
let checkbox = document.querySelectorAll("input[type='checkbox']");

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('click', function () {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`checkbox-${i}`).checked = false;
            document.getElementById(`label-${i}`).classList.remove("check");
            document.getElementById(`label-${i}`).classList.add("uncheck");
        }
        document.getElementById(checkbox[i].id).checked = true;
        document.getElementById(checkbox[i].id).nextElementSibling.classList.add("check");
        document.getElementById(checkbox[i].id).nextElementSibling.classList.remove("uncheck");
    });
}

var timeUp = sessionStorage.getItem('isTimeUp');

if (timeUp == "true") {
    document.getElementById('popup').style.display = "flex";
    document.getElementById('popup').style.opacity = "1";
    document.getElementById('cross').addEventListener('click', function () {
        location.href = "quiz-end.html";
    })
}
else {
    timer(1.5);   // timer for five minutes
}

// for Showing name while taking quiz
let name = sessionStorage.getItem('name');
if (name != null) {
    document.getElementById('name').innerText = `Welcome! ${name}`;
}
else {
    document.getElementById('name').innerText = `Welcome! Man`;
}

// timeleft timer
function timer(minutes) {
    let timeLeft = 60 * minutes;
    let counter1 = 0;
    let counter2 = 0;

    function convertSeconds(s) {
        let minutes = Math.floor(s / 60);
        let seconds = s % 60;

        let formatted_sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        let formatted_min = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${formatted_min} : ${formatted_sec}`;
    }

    let interval = setInterval(function () {
        let time = (timeLeft - counter1);
        document.getElementById('timer').innerText = convertSeconds(time);
        let mytime = convertSeconds(counter2);
        sessionStorage.setItem('time', mytime);
        sessionStorage.setItem('isTimeUp', "false");

        counter1++;
        counter2++;

        if (time == 0) {
            clearInterval(interval);
            document.getElementById('popup').style.display = "flex";
            document.getElementById('popup').style.opacity = "1";
            sessionStorage.setItem('isTimeUp', "true");

            document.getElementById('cross').addEventListener('click', function () {
                location.href = "quiz-end.html";
            })
        }
    }, 1000);
}


let quiz = [
    q1 = {
        question: "Q1 : What is the full form of RAM ?",
        option1: "Random Access Memory",
        option2: "Randomely Access Memory",
        option3: "Run Aceapt Memory",
        option4: "None of these",
        answer: "Random Access Memory"
    },

    q2 = {
        question: "Q2 : What is the full form of CPU ?",
        option1: "Central Program Unit",
        option2: "Central Processing Unit",
        option3: "Central Preload Unit",
        option4: "None of these",
        answer: "Central Processing Unit"
    },

    q3 = {
        question: "Q3 : What is the full form of E-mail ?",
        option1: "Electronic Mail",
        option2: "Electric Mail",
        option3: "Engine Mail",
        option4: "None of these",
        answer: "Electronic Mail"
    },
    q4 = {
        question: "Q4 : The first mechanical computer designed by Charles Babbage was called ?",
        option1: "Abacus",
        option2: "Analytical Engine",
        option3: "Calculator",
        option4: "None of these",
        answer: "Analytical Engine"
    },
    q5 = {
        question: "Q5 : Which of the following is the most powerful type of computer ?",
        option1: "Super–micro",
        option2: "Super conductor",
        option3: "Super computer",
        option4: "None of these",
        answer: "Super computer"
    },
    q6 = {
        question: "Q6 : Web pages are written using ?",
        option1: "FTP",
        option2: "HTTP",
        option3: "HTML",
        option4: "None of these",
        answer: "HTML"
    },
    q7 = {
        question: "Q7 : Which of the following use in web programming ?",
        option1: "PHP",
        option2: "JavaScript",
        option3: "HTML",
        option4: "None of these",
        answer: "JavaScript"
    },
    q8 = {
        question: "Q8 : A device that converts digital signals to analog signals is ?",
        option1: "A packet",
        option2: "A modem",
        option3: "Both (A) and (B)",
        option4: "None of these",
        answer: "A modem"
    },
    q9 = {
        question: "Q9 : What is the primary requisite of a good computer programmer ?",
        option1: "Mathematical mind",
        option2: "Artistic mind",
        option3: "Logical mind",
        option4: "None of these",
        answer: "Logical mind"
    },
    q10 = {
        question: "Q10 : Which of the following is a presentation program ?",
        option1: "MS-Word",
        option2: "MS-Excel",
        option3: "MS-Power Point",
        option4: "None of these",
        answer: "MS-Power Point"
    }
];

let question_count = 0;
let points = 0;

show(question_count);

function show(count) {
    let question = document.getElementById('question');
    let label1 = document.getElementById('label-1');
    let label2 = document.getElementById('label-2');
    let label3 = document.getElementById('label-3');
    let label4 = document.getElementById('label-4');

    if (count <= quiz.length - 1) {
        question.innerText = quiz[count].question;
        label1.innerText = quiz[count].option1;
        label2.innerText = quiz[count].option2;
        label3.innerText = quiz[count].option3;
        label4.innerText = quiz[count].option4;
    }
}

document.getElementById('next-btn').addEventListener('click', next);
function next() {
    let checkbox = Object.values(document.querySelectorAll("input[type='checkbox']"));
    let checker = false;

    checker = checkbox.every(function (element) {
        return (element.checked == false);
    });

    if (checker) {
        document.getElementById('massage').innerText = "Please Select One of these Options";
    }
    else {
        document.getElementById('massage').innerText = "";
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked && (question_count <= quiz.length - 1)) {
                if (checkbox[i].nextElementSibling.innerText == quiz[question_count].answer) {
                    points += 5;
                }
                else {
                    points += 0;
                }
            }
        }

        // for uncheck every time checkboxes when next function is call
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`checkbox-${i}`).checked = false;
            document.getElementById(`label-${i}`).classList.remove("check");
        }

        sessionStorage.setItem('points', points);

        if (question_count == quiz.length - 1) {
            location.href = "quiz-end.html";
        }

        question_count++;
        show(question_count);
    }
}

/*
// Timer Without TimeLeft

let seconds = 0;
let minutes = 0;

setInterval(function () {
    if (seconds < 60) {
        seconds++;
    } else {
        seconds = 0;
        minutes++;
    }
    let formatted_sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let formatted_min = minutes < 10 ? `0${minutes}` : `${minutes}`
    document.getElementById('timer').innerText = `${formatted_min} : ${formatted_sec}`;
}, 1000);

*/