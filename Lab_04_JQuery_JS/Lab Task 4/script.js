var currentTab = "home";

function openTab(tabId, clickedBtn) {
    if (tabId === currentTab) return;

    // 1. Hide current tab
    document.getElementById(currentTab).classList.remove("active-tab");

    // 2. Remove active class from all buttons
    var allBtns = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove("active");
    }

    // 3. Show new tab
    document.getElementById(tabId).classList.add("active-tab");

    // 4. Set button active
    clickedBtn.classList.add("active");

    // 5. Update tracker
    currentTab = tabId;
}

function sendMsg() {
    const name = document.getElementById("c-name").value;
    if (name === "") {
        alert("Please enter a name!");
    } else {
        document.getElementById("form-msg").style.display = "block";
    }
}