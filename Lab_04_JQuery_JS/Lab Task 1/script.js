

var count = 0;

function addItem() {
    var input = document.getElementById("item-input");
    var text = input.value;

    // check if input is empty
    if (text == "") {
        alert("Please enter something!");
        return;
    }

    var li = document.createElement("li");
    li.innerHTML = text;

    var btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.className = "delete-btn";
    btn.onclick = function () {
        li.remove();
        count--;
        updateCount();
    };

    li.appendChild(btn);

    var list = document.getElementById("my-list");
    list.appendChild(li);

    input.value = "";

    count++;
    updateCount();
}

function updateCount() {
    document.getElementById("count-text").innerHTML = "Total items: " + count;
}

document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("item-input");
    input.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            addItem();
        }
    });
});
