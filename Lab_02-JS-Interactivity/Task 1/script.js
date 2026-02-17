var answer1 = "javascript";
var answer2 = "let";
var answer3 = "//";
var answer4 = "getelementbyid";

function checkQ1() {
    return document.getElementById("q1").value.toLowerCase() === answer1 ? 1 : 0;
}

function checkQ2() {
    return document.getElementById("q2").value.toLowerCase() === answer2 ? 1 : 0;
}

function checkQ3() {
    return document.getElementById("q3").value === answer3 ? 1 : 0;
}

function checkQ4() {
    return document.getElementById("q4").value.toLowerCase() === answer4 ? 1 : 0;
}

function calculateScore() {
    var totalScore = checkQ1() + checkQ2() + checkQ3() + checkQ4();
    var result = document.getElementById("result");

    let message = "Your Score: " + totalScore + " / 4 <br>";

    if (totalScore === 4) {
        message += " Outstanding! Perfect Score!";
        result.style.color = "#00ffcc";
    }
    else if (totalScore >= 2) {
        message += "Great effort! Keep improving!";
        result.style.color = "#ffe066";
    }
    else {
        message += "Don't worry! Practice makes perfect!";
        result.style.color = "#ffb3b3";
    }

    result.innerHTML = message;
}

function resetQuiz() {
    document.getElementById("q1").value = "";
    document.getElementById("q2").value = "";
    document.getElementById("q3").value = "";
    document.getElementById("q4").value = "";
    document.getElementById("result").innerHTML = "";
}

document.getElementById("submitBtn").addEventListener("click", calculateScore);
document.getElementById("resetBtn").addEventListener("click", resetQuiz);
