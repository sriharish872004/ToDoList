// From the localStorage we are taking a stored array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let button = document.getElementById("submitBtn");
let input = document.getElementById("taskInput");
let search = document.getElementById("searchInput");
let resultElement = document.getElementById("result");

function renderTasks(arr){
    resultElement.innerHTML = '';
    arr.forEach(item => {
        resultElement.innerHTML += `<div class="bg-white/20 backdrop-blur-md shadow-lg rounded-lg p-4 flex justify-between items-center border border-white/30">
        <h1 class="text-lg font-medium text-gray-900 flex items-center gap-2">
            <input type="checkbox" onchange="toggleCompleted(${item.id})" ${item.isCompleted ? "checked" : ""} 
                class="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <span class="${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}">
                ${item.name}
            </span>
            ${item.isCompleted ? "<b>- Completed</b>" : ""}
        </h1>
        <button onclick="deleteTask(${item.id})" 
            class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all">
            Delete
        </button>
    </div>`;
    });
}
// Rendering on load
renderTasks(tasks);

// Button Working
button.addEventListener('click', ()=>{
    let value = input.value.trim();
    if(value){
        let obj = {id: Date.now(), name: value, isCompleted: false};
        tasks.push(obj);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = ""; 
        renderTasks(tasks);
        // Clearing the text box after adding a task
        
    }
});

// Search Engine
search.addEventListener('keyup', ()=>{
    let searchKey = search.value.toLowerCase();
    let searchTasks = tasks.filter(item => item.name.toLowerCase().includes(searchKey));
    renderTasks(searchTasks);
});

// Deleting Tasks
function deleteTask(taskID){
    tasks = tasks.filter(item => item.id != taskID);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}

// Check box Toggle
function toggleCompleted(taskID){
    tasks = tasks.map((item)=>{
        if(item.id == taskID){
            item.isCompleted = !item.isCompleted;
        }
        return item;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}
