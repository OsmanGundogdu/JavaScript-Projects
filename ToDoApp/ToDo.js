let gorevListesi = [];

if (localStorage.getItem("gorevListesi") !== null) {
    gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}

let editId;
let isEditTask = false;

const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span");

displayTasks("all");

function displayTasks(filter) {
    let ul = document.getElementById("task-list");
    ul.innerHTML = "";

    if (gorevListesi.length == 0)
        ul.innerHTML = "<p class='p-3 m-0'>Görev Listeniz Boş.</p>"
    else {
        for(let gorev of gorevListesi) {

            let completed = gorev.durum == "completed" ? "checked" : "";

            if (filter == gorev.durum || filter == "all") {
                let li = `
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input type="checkbox" onClick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
                            <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: black;">
                            <i class="fa-solid fa-ellipsis"></i> </button>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a onClick='deleteTask("${gorev.id}")' class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                                <li><a onClick='editTask("${gorev.id}", "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square"></i> Düzenle</a></li>
                            </ul>
                        </div>
                    </li>
                `;
                ul.insertAdjacentHTML("beforeend", li);
            }
        }
    }
        
}

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document.querySelector("#btnAddNewTask").addEventListener("keypress", function(){
    if (event.key == "Enter") {
        document.getElementById("btnAddNewTask").click();
    }
});

for (let span of filters) {
    span.addEventListener("click", function() {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTasks(span.id);
    });
}

function newTask(event) {

    if(taskInput.value == "") {
        alert("görev girmelisiniz");
    } else {
        if(!isEditTask){
            // ekleme
            gorevListesi.push({"id": crypto.randomUUID(), "gorevAdi": taskInput.value, "durum": "pending"});
        } else {
            // güncelleme
            for (let gorev of gorevListesi) {
                if(gorev.id == editId)
                    gorev.gorevAdi = taskInput.value;
                isEditTask = false;
            }
        }
        taskInput.value = "";
        displayTasks(document.querySelector("span.active").id);
        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    }

    event.preventDefault();
}  

function deleteTask (id) {
    let deletedId;
    for (let index in gorevListesi) {
        if (gorevListesi[index].id == id) {
            deletedId = index; 
        }
    }

    // // another way to find the index
    // deletedId = gorevListesi.findIndex(function(gorev){
    //     return gorev.id == id;
    // })

    // // arrow func
    // deletedId = gorevListesi.findIndex(gorev => gorev.id == id)

    gorevListesi.splice(deletedId,1);
    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}

function editTask (id, gorevAdi) {
    editId = id;
    isEditTask = true;
    taskInput.value = gorevAdi;
    taskInput.focus();
    taskInput.classList.add("active");
}

btnClear.addEventListener("click", function(){
    gorevListesi.splice(0, gorevListesi.length);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    displayTasks();
});

function updateStatus(selectedTask){
    // console.log(selectedTask.parentElement.lastElementChild);
    let label = selectedTask.nextElementSibling;
    let durum;

    if (selectedTask.checked){
        label.classList.add("checked");
        durum = "completed";
    } else {
        label.classList.remove("checked");
        durum = "pending";
    }

    for (let gorev of gorevListesi) {
        if (gorev.id == selectedTask.id)
            gorev.durum = durum;
    }

    displayTasks(document.querySelector("span.active").id);

    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}
