if (
    localStorage.getItem("quizAccess") !== "allowed" ||
    !localStorage.getItem("currentQuizUser")
) {
    window.location.replace("./index(1).html");
}

let questions = [
    {
        question: "SMIT STAND........?",
        Option: [
            "Saylani mass it training",
            "Saylani It training",
            "Smit",
            "Saylani"
        ],
        answer: "Saylani mass it training"
    },
    {
        question: "HTML",
        Option: ["PL", "ML", "SL", "ALL"],
        answer: "ML"
    },
    {
        question: "JS",
        Option: ["PL", "ML", "SL", "ALL"],
        answer: "SL"
    },
    {
        question: "HTML Stands For?",
        Option: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "CSS Stands For?",
        Option: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which tag is used for a paragraph in HTML?",
        Option: ["<h1>","<p>","<div>","<br>"],
        answer: "<p>"
    },
    {
        question: "Which HTML tag is used to insert an image?",
        Option: [
            "<image>",
            "<picture>",
            "<img>",
            "<src>"
        ],
        answer: "<img>"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        Option: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: "<a>"
    },
    {
        question: "Which CSS property changes the text color?",
        Option: [
            "background",
            "font-size",
            "color",
            "text-style"
        ],
        answer: "color"
    },
    {
        question: "Which CSS property changes the background color?",
        Option: [
            "color",
            "background-color",
            "font-color",
            "style-color"
        ],
        answer: "background-color"
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        Option: [".","#","*","@"],
        answer: "#"
    },
    {
        question: "Which symbol is used for a class selector in CSS?",
        Option: ["#",".","&","$"],
        answer: "."
    },
    {
        question:  "Which keyword can be used to declare a variable in JavaScript?",
        Option: [
            "var",
            "int",
            "string",
            "define"
        ],
        answer: "var"
    },
    {
        question: "Which method displays a message in the console?",
        Option: [
            "console.print()",
            "console.log()",
            "print.console()",
            "message.log()"
        ],
        answer: "console.log()"
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        Option: ["=","==","===","!="],
        answer: "==="
    },
    {
        question: "Which keyword is used to define a function in JavaScript?",
        Option: [
            "function",
            "method",
            "func",
            "define"
        ],
        answer: "function"
    },
    {
        question: "Which method adds an item to the end of an array?",
        Option: [
            "pop()",
            "shift()",
            "push()",
            "remove()"
        ],
        answer: "push()"
    },
    {
        question: "Which HTML tag is used to create an unordered list?",
        Option: [
            "<ol>",
            "<ul>",
            "<li>",
            "<list>"
        ],
        answer: "<ul>"
    },
    {
        question: "Which HTML attribute specifies the destination URL of a link?",
        Option: [
            "src",
            "alt",
            "href",
            "target"
        ],
        answer: "href"
    },
    {
        question: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?",
        Option: [
            "const",
            "let",
            "static",
            "final"
        ],
        answer: "let"
    }

];

let question = document.getElementById("question");
let qno = document.getElementById("qno");
let timer = document.getElementById("timer");

let time = 5*60;
let startInterval;

let options = document.querySelectorAll('input[name="quiz"]');
let label = document.querySelectorAll("label");
let button = document.querySelector("button");

let index = 0;
let score = 0;
let quizFinished = false;
 
function saveResult() {
    let finalScore = (score / questions.length) * 100;

    let result = {
        email: localStorage.getItem("currentQuizUser"),
        score: score,
        totalQuestions: questions.length,
        percentage: finalScore,
        date: new Date().toLocaleString()
    };

    localStorage.setItem("quizResult", JSON.stringify(result));

    return finalScore;
}
 
function finishQuiz() {
    if (quizFinished) {
        return;
    }

    quizFinished = true;
    clearInterval(startInterval);

    let finalScore = saveResult();

    document.getElementById("container").innerHTML = `
        <h1>Quiz Submit</h1>
        <h2>Score ${finalScore}% out of 100</h2>
        <button onclick="window.location.reload()">Again Test</button>
    `;
}

function startTimer() {
    startInterval = setInterval(function () {
        let min = Math.floor(time / 60);
        let second = time % 60;

        timer.innerText =
            `Time : ${min}:${second < 10 ? "0" + second : second}`;

        timer.style.textAlign = "right";

        time--;

        if (time < 0) {
            clearInterval(startInterval);
            alert("Quiz Submitted");
            finishQuiz();
        }
    }, 1000);
}

button.addEventListener("click", function () {
    nextQuestion();
});

function showQuestion() {
    question.innerText = questions[index].question;

    qno.innerText =
        "Question " + (index + 1) + " of " + questions.length;

    options[0].value = questions[index].Option[0];
    options[1].value = questions[index].Option[1];
    options[2].value = questions[index].Option[2];
    options[3].value = questions[index].Option[3];

    label[0].innerText = questions[index].Option[0];
    label[1].innerText = questions[index].Option[1];
    label[2].innerText = questions[index].Option[2];
    label[3].innerText = questions[index].Option[3];

    options[0].checked = false;
    options[1].checked = false;
    options[2].checked = false;
    options[3].checked = false;

    button.innerText =
        index === questions.length - 1 ? "Submit" : "Next";
}

function CheckAnswer() {
    let selectedOption;

    if (options[0].checked) {
        selectedOption = options[0].value;
    } else if (options[1].checked) {
        selectedOption = options[1].value;
    } else if (options[2].checked) {
        selectedOption = options[2].value;
    } else if (options[3].checked) {
        selectedOption = options[3].value;
    }

    if (selectedOption === undefined) {
        alert("select one option");
        return false;
    }

    if (selectedOption === questions[index].answer) {
        score++;
    }

    return true;
}

function nextQuestion() {
    if (quizFinished) {
        return;
    }

    let status = CheckAnswer();

    if (status === true) {
        index++;

        if (index === questions.length) {
            finishQuiz();
        } else {
            showQuestion();
        }
    }
}

showQuestion();
startTimer();
