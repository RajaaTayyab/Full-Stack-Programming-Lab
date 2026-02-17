function completeTask(taskId) {

    var taskInput = document.getElementById(taskId);

    var allTasks = document.querySelectorAll(".task input");

    for (var i = 0; i < allTasks.length; i++) {
        allTasks[i].style.textDecoration = "none";
    }

    taskInput.style.textDecoration = "line-through";
}

function removeTask(taskId) {
    document.getElementById(taskId).parentElement.style.display = "none";
}
