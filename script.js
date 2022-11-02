//listas simulando BD mocado
const taskList = [
    // { title: 'fazer pão', category: 'cozinha', hour: '12:00', completed: true },
    // { title: 'fazer café', category: 'cozinha', hour: '12:00', completed: false },
    // { title: 'fazer chá', category: 'cozinha', hour: '12:00', completed: false },
    // { title: 'fazer suco', category: 'cozinha', hour: '12:00', completed: false },
];

const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const renderList = () => {
    let liContent = '';
    taskList.forEach(({ title, category, hour, completed }, index) => {
        liContent += `
        <li class="list-group-item d-flex justify-content-between align-items-center mb-3 rounded border ps-0">
                <button type="button" class="btn btn-link p-2" onclick="toggleStatus(${index})">
                    <i class="bi ${completed ? 'bi-check-circle-fill' : 'bi-circle'} fs-4 text-dark"></i>
                </button>
                <div class="me-auto">
                    <span class="fw-bold fs-5 m-0">${title}</span>
                    <div class="d-flex align-items-center justify-content-start">
                        <span class="text-muted">${category}</span>
                        <span class="fs-2 px-1 lh-1">•</span>
                        <span class="text-muted">
                            <i class="bi bi-clock"></i> ${hour}
                        </span>
                    </div>
                </div>
                <div class="text-end d-flex justify-content-between align-items-center" style="min-width: 81px">
                    <button type="button" class="btn btn-dark px-2 py-1" data-bs-toggle="modal" data-bs-target="#task-modal" data-bs-action="edit" data-bs-index="${index}">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button type="button" class="btn btn-outline-dark px-2 py-1" onclick="deleteTask(${index})">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </li>
        `
    })

    if (taskList.length === 0) {
        liContent += `
        <div class="alert alert-dark text-center" role="alert">
            Ainda não há tarefas para este dia
        </div>
        `
    }

    var listaDeTarefas = document.querySelector("#list-tasks");
    listaDeTarefas.innerHTML = liContent;

}

const createTask = () => {
    let inputTitle = document.getElementById("input-title").value;
    let inputCat = document.getElementById("input-category").value;
    let inputHour = document.getElementById("input-hour").value;
    taskList.push({
        title: inputTitle,
        category: inputCat,
        hour: inputHour,
        completed: false
    })
}

const deleteTask = (index) => {
    taskList.splice(index, 1);
    renderList();
}

const upDateTask = (index) =>{
    let inputTitle = document.getElementById("input-title").value;
    let inputCat = document.getElementById("input-category").value;
    let inputHour = document.getElementById("input-hour").value;

    taskList[index] = {
        title: inputTitle,
        category: inputCat,
        hour: inputHour
    }
   
}

const getTask = (index)  => {
    return taskList[index];
}

const toggleStatus = (index) => {
    taskList[index].completed = !taskList[index].completed;
    renderList();
}

const taskModalElement = document.getElementById("task-modal");
const taskModal = new bootstrap.Modal(taskModalElement, {});

taskModalElement.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    const action = button.getAttribute("data-bs-action");
    const indexTask = button.getAttribute("data-bs-index");

    const modalTitle = taskModalElement.querySelector(".modal-title");
    const btnSave = taskModalElement.querySelector("#btn-save");

    modalTitle.textContent = action === "add" ? "Nova Tarefa" : "Editar Tarefa";
    
    let inputTitle = document.getElementById("input-title");
    let inputCat = document.getElementById("input-category");
    let inputHour = document.getElementById("input-hour");

    switch (action) {
        case "add":
            inputTitle.value = "";
            inputCat.value = "";
            inputHour.value = "";
            break;
        case "edit":
            let taskEdit = getTask(indexTask);
            inputTitle.value = taskEdit.title;
            inputCat.value = taskEdit.category;
            inputHour.value = taskEdit.hour;
            break;
        default:
            break;
    }

    btnSave.onclick = () => {
        if (inputTitle.value === "" || inputCat.value === "" || inputHour.value === "") {
            alert("Por favor, Preencha todos os campos");
            return;
        }
        switch (action) {
            case "add":
                createTask();
                break;
            case "edit":
                upDateTask(indexTask);
                break;
            default:
                break;
        }
        renderList();
        taskModal.hide(taskModalElement);
    };
});

const hourArea = document.querySelector("#hour");
const dateArea = document.querySelector("#date");

setInterval(()=>{
    const newDate = new Date();
    let hour = newDate.getHours();
    let min = newDate.getMinutes();
    let day = newDate.getDay(); //retorna o dia da semana em número
    let date = newDate.getDate(); //retorna o dia
    let month = newDate.getMonth();

    hourArea.innerHTML = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2,'0')}` //02:45
    dateArea.innerHTML = `${days[day]}, ${date} de ${months[month]}` //domingo, 14 de janeiro
    
}, 1000)

renderList(); // Renderizando a lista de tarefas na tela

