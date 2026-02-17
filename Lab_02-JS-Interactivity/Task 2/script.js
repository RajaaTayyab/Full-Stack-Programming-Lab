function calculate() {

    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);
    var operation = document.getElementById("operation").value;
    var resultBox = document.getElementById("resultBox");

    // Validate numbers
    if (isNaN(num1) || isNaN(num2)) {
        resultBox.innerHTML = "Please enter valid numbers!";
        resultBox.style.backgroundColor = "#ffc9c9";
        return;
    }

    // Prevent division by zero
    if (operation === "/" && num2 === 0) {
        resultBox.innerHTML = "Cannot divide by zero!";
        resultBox.style.backgroundColor = "#ff6b6b";
        return;
    }

    var result;

    if (operation === "+") {
        result = num1 + num2;
    }
    else if (operation === "-") {
        result = num1 - num2;
    }
    else if (operation === "*") {
        result = num1 * num2;
    }
    else if (operation === "/") {
        result = num1 / num2;
    }

    resultBox.innerHTML = "Result: " + result;

    if (result > 0) {
        resultBox.style.backgroundColor = "#d4edda";
    }
    else if (result < 0) {
        resultBox.style.backgroundColor = "#f8d7da";
    }
    else {
        resultBox.style.backgroundColor = "#fff3cd"; // yellow
    }
}

document.getElementById("calculateBtn").addEventListener("click", calculate);
