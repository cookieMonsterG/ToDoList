let taskNumber = 0

function createTaskElement(taskName) {
    let taskElement = document.createElement('div');
    taskElement.classList.add("task")
    taskElement.classList.add("incompleted")
    taskElement.setAttribute("id", taskNumber);
    taskNumber++;
    if (document.getElementById("displayButton").innerHTML === "Completed") {
        taskElement.classList.add("hidden")
    } else {
        taskElement.classList.add("displayed")
    }
    taskElement.innerHTML = `\n<div class="task-name">${taskName}</div>\n<div class="delete">X</div>\n`
    return taskElement
}

function createCompletedTask(taskName, id) {
    let taskElement = document.createElement('div');
    taskElement.classList.add("task")
    taskElement.classList.add("completed")
    taskElement.classList.add("displayed")
    taskElement.setAttribute("id", id);
    taskElement.innerHTML = `\n<div class="task-name"><span>&#10003;</span><del>${taskName}</del></div>\n<div class="delete">X</div>\n`
    return taskElement
}

//add button
document.getElementById('addButton').addEventListener('click',
    () => {
        const newTask = document.getElementById('input').value;

        //make sure text box is not empty
        if (newTask === "") return;

        let table = document.getElementById('table');
        let newElement = createTaskElement(newTask);
        if (table.children) {
            table.insertBefore(newElement, table.children[0]);
        } else {
            table.appendChild(newElement);
        }
        newElement.onclick = function() {
            newElement.remove();
            const newCompletedTask = createCompletedTask(newTask, newElement.id)
            table.appendChild(newCompletedTask)
            removeTask(newCompletedTask);
        }

        //clear input box
        document.getElementById('input').value = ""

        //add onclicklistener to delete button
        removeTask(newElement);

    })

// hit enter to trigger add button
document.getElementById('input').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addButton").click();
    }
})

//delete button
function removeTask(task) {
    const deleteButton = task.children[1]
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        let choice = confirm(`Have you completed ${task.children[0].textContent}?`)
        if (choice) {
            deleteButton.parentElement.remove();
        }
        return;
    })
}


//sort button, only sort tasks displayed on the screen
const sortButton = document.getElementById("sort");
sortButton.addEventListener('click', () => {
    const completedList = document.getElementsByClassName("completed")
    const incompletedList = document.getElementsByClassName("incompleted")
    let completedArr = [...completedList];
    let incompletedArr = [...incompletedList];
    const sortActive = sortButton.classList.contains("active");
    if (sortActive) {
        sortButton.classList.remove("active")
        sortButton.innerHTML = "Sort: Descending"
        completedArr.sort((a, b) => { return b.id.localeCompare(a.id); })
        incompletedArr.sort((a, b) => { return b.id.localeCompare(a.id); })

    } else {
        sortButton.classList.add("active")
        sortButton.innerHTML = "Sort: Ascending"
        completedArr.sort((a, b) => { return a.id.localeCompare(b.id); })
        incompletedArr.sort((a, b) => { return a.id.localeCompare(b.id); })
    }
    //reorder tasks
    for (let i = 0; i < incompletedArr.length; i++) {
        var parent = incompletedArr[i].parentElement;
        var detatchedItem = parent.removeChild(incompletedArr[i]);
        parent.appendChild(detatchedItem);
    }
    for (let i = 0; i < completedArr.length; i++) {
        var parent = completedArr[i].parentElement;
        var detatchedItem = parent.removeChild(completedArr[i]);
        parent.appendChild(detatchedItem);
    }
})



//dispaly button
//const display = ["All", "Incompleted", "Conpleted"];
const displayButton = document.getElementById("displayButton");
displayButton.addEventListener('click', () => {
    if (displayButton.innerHTML === "Display: All") {
        displayButton.innerHTML = "Display: Incompleted"
        const completedList = document.getElementsByClassName("completed")
        for (let task of completedList) {
            task.classList.remove("displayed")
            task.classList.add("hidden")
        }
        const inCompletedList = document.getElementsByClassName("incompleted")
        for (let task of inCompletedList) {
            task.classList.remove("hidden")
            task.classList.add("displayed")
        }
    } else if (displayButton.innerHTML === "Display: Incompleted") {
        displayButton.innerHTML = "Display: Completed"
        const inCompletedList = document.getElementsByClassName("incompleted")
        for (let task of inCompletedList) {
            task.classList.remove("displayed")
            task.classList.add("hidden")
        }
        const completedList = document.getElementsByClassName("completed")
        for (let task of completedList) {
            task.classList.remove("hidden")
            task.classList.add("displayed")
        }
    } else if (displayButton.innerHTML === "Display: Completed") {
        displayButton.innerHTML = "Display: All"
        const list = document.getElementsByClassName("task")
        for (let task of list) {
            task.classList.remove("hidden")
            task.classList.add("displayed")
        }
    }
})