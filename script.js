
let taskArray = []
if(localStorage.getItem("tasks")){
    taskArray=JSON.parse(localStorage.getItem("tasks"))
}
let input = document.getElementById("taskInput");
let submit = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

function addTask() {
    let inputText = input.value.trim();
    if (inputText !== "") {
        const task = {
            id:Date.now(),
            title: inputText,
            done: false
        };
        taskArray.push(task)
        console.log(taskArray)
        input.value = "";
        showList();
    }
}

input.addEventListener("keydown",function(event){
    if (event.key === "Enter"){
        addTask();
    }
})

function showList() {
    taskList.innerHTML = "";
    taskArray.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.title


        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";
        toggleBtn.onclick = () => toggle(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        task.done ? (li.style.textDecoration = "line-through") : ("")
        li.appendChild(toggleBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        window.localStorage.setItem("tasks",JSON.stringify(taskArray));
    });
    console.log("Rendering task list:", taskArray);

}

function toggle(index) {
    taskArray[index].done = !taskArray[index].done
    console.log("Toggled task:", taskArray[index]);

    showList();
}

function deleteTask(i) {
    taskArray.splice(i, 1) // BAD PRACTICE: Leaves holes in array

    showList();
}

// Extra confusing logic
setInterval(() => {
    if (taskArray && taskArray.every(task => task.done)) {
        console.log("All tasks done!");
    }
}, 10000);
showList();