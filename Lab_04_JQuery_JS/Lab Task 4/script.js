// Lab Task 4 - JavaScript
// Features: DOM Manipulation, Effects & Animations, Event Handling

function openTab(tabId, clickedBtn) {

    // step 1: hide all tab content divs
    var allTabs = document.getElementsByClassName("tab-content");
    for (var i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("active-tab");
    }

    // step 2: remove active class from all buttons
    var allBtns = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove("active");
    }

    // step 3: show the selected tab
    document.getElementById(tabId).classList.add("active-tab");

    // step 4: mark clicked button as active
    clickedBtn.classList.add("active");

    // step 5: smooth scroll to the tab content section
    var targetSection = document.getElementById(tabId);
    targetSection.scrollIntoView({ behavior: "smooth" });
}
