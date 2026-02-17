function addColor(inputId) {

    var color = document.getElementById(inputId).value;

    var box = document.createElement("div");
    box.style.backgroundColor = color;

    document.getElementById("colorBoxes").appendChild(box);

    // Bonus: BOM Info
    document.getElementById("browserInfo").innerHTML =
        "Window Size: " + window.innerWidth + " x " + window.innerHeight;
}

function clearBoxes() {
    document.getElementById("colorBoxes").innerHTML = "";
}
