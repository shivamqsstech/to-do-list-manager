document.addEventListener('DOMContentLoaded', ()=>{


const addBtn = document.getElementById('addTask');
// console.log(addBtn)
addBtn.addEventListener('click', ()=>{

    let inputText = document.getElementById('input-task');
    let content = inputText.value;
    console.log(content);

    if(content.trim()===""){
        window.alert("Task cannot be empty");
        return;
    }



    function addTask(newData){
        //if the task exists it will return the task and it wil get converted in to Javascrpt obj
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newData);

        //saving the updated tasks to the local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        console.log("clicked");


    }

    const newTask = {
        id: Date.now(),
        task: content,
        status : "pending"
    }

    addTask(newTask);

    inputText.value ="";

    displayTasks();

});



function displayTasks(){

    let tasksItem = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // selecting the element whre we want to dislpay our data
    let taskList = document.getElementById('task-list');
    taskList.innerHTML ="";
   
    tasksItem.forEach(task => {
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "https://img.icons8.com/ios-glyphs/30/delete.png";
        const listItems =document.createElement('li');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.style.marginRight="10px";


        // setting checkbox staus babsed on task status
        checkBox.checked = task.status ==="done";

    

        // checkBox.checked = task.status ==="done";

        // if (checkBox.checked || task.status ==="done" ){ /// modified
        
        // }





        checkBox.addEventListener('change', ()=>{
            task.status= checkBox.checked ? "done" : "pending";
            localStorage.setItem("tasks",JSON.stringify(tasksItem));
            listItems.style.textDecoration = checkBox.checked ? "line-through" : "none";
            listItems.style.color = checkBox.checked ? "red" : "black";
        });


        listItems.textContent = task.task;
        if (task.status == "done"){
            listItems.style.color = "red" ;

        }
        listItems.prepend(checkBox);
       

        listItems.appendChild(deleteIcon);

        deleteIcon.addEventListener('click', ()=>{
            tasksItem = tasksItem.filter(t=>t.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasksItem));
            taskList.removeChild(listItems);
            taskList.removeChild(deleteIcon);

            // displayTasks();
        });

        taskList.appendChild(listItems);

        
        
    });

}
displayTasks();

});

