// IEFE
(() => {
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  // event listeners
  form.addEventListener('submit', e => {
    // prevent default behaviour - Page reload
    e.preventDefault();
    // give item a unique ID
    let itemId = String(Date.now());
    // get/assign input value
    let toDoItem = input.value;
    //pass ID and item into functions
    addItemToDOM(itemId , toDoItem);
    addItemToArray(itemId, toDoItem);
    // clear the input box. (this is default behaviour but we got rid of that)
    input.value = '';
  });

  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id')
    if (!id) return // user clicked in something else
    //pass id through to functions
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });

  // functions
  function addItemToDOM(itemId, toDoItem) {
    // create an li
    const li = document.createElement('li')
    li.setAttribute("data-id", itemId);
    // add toDoItem text to li
    li.innerText = toDoItem
    // add li to the DOM
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {
    // add item to array as an object with an ID so we can find and delete it later
    toDoListArray.push({ itemId, toDoItem});
    console.log(toDoListArray)
  }

  function removeItemFromDOM(id) {
    // get the list item by data ID
    var li = document.querySelector('[data-id="' + id + '"]');
    // remove list item
    ul.removeChild(li);
  }

  function removeItemFromArray(id) {
    // create a new toDoListArray with all li's that don't match the ID
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }

})();
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve tasks from local storage if available
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = { text: taskText, id: Date.now() };
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks(tasks);

        // Clear input field
        taskInput.value = "";
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(tasks);
}

function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        const timestamp = new Date(task.id);
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="timestamp">${formatDate(timestamp)}</div>
            <i class="material-icons" onclick="deleteTask(${task.id})">delete</i>
        `;
        taskList.appendChild(li);
    });
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
