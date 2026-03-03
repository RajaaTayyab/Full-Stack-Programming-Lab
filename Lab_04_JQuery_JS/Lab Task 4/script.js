// Lab Task 4 - script.js
// Features used: DOM Manipulation, Event Handling, Effects & Animations

// variable to track which tab is open right now
var currentTab = "home";

// this function runs when a tab button is clicked
function openTab(tabId, clickedBtn) {

    // don't do anything if same tab is clicked again
    if (tabId == currentTab) {
        return;
    }

    // step 1 - hide the current tab content
    var oldTab = document.getElementById(currentTab);
    oldTab.classList.remove("active-tab");

    // step 2 - remove active class from all buttons
    var allBtns = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove("active");
    }

    // step 3 - show the new tab
    var newTab = document.getElementById(tabId);
    newTab.classList.add("active-tab");

    // step 4 - make clicked button active
    clickedBtn.classList.add("active");

    // step 5 - update the current tab variable
    currentTab = tabId;

    // step 6 - smooth scroll to the content box
    var contentBox = document.getElementById("content-box");
    contentBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

// contact form send button function
function sendMsg() {
    var name = document.getElementById("c-name").value;
    var email = document.getElementById("c-email").value;
    var msg = document.getElementById("c-msg").value;

    // basic check - make sure fields are not empty
    if (name == "" || email == "" || msg == "") {
        alert("Please fill in all fields!");
        return;
    }

    // show success message
    document.getElementById("form-msg").style.display = "block";

    // clear the form
    document.getElementById("c-name").value = "";
    document.getElementById("c-email").value = "";
    document.getElementById("c-msg").value = "";
}
