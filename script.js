const taskList = [
    { title: 'fazer pão', category: 'cozinha', hour: '12:00', completed: true },
    { title: 'fazer café', category: 'cozinha', hour: '12:00', completed: false },
    { title: 'fazer chá', category: 'cozinha', hour: '12:00', completed: false },
    { title: 'fazer suco', category: 'cozinha', hour: '12:00', completed: false },
]

const renderList = ()=>{
    let liContent = '';
    taskList.forEach(({title,category,hour,completed}, index)=>{
        liContent += `
        <li class="list-group-item d-flex justify-content-between align-items-center mb-3 rounded border ps-0">
                <button type="button" class="btn btn-link p-2">
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
                    <button type="button" class="btn btn-outline-dark px-2 py-1">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </li>
        `
    })

    if(taskList.length === 0){
        liContent += `
        <div class="alert alert-dark text-center" role="alert">
            Ainda não há tarefas para este dia
        </div>
        `
    }
    
    var listaDeTarefas = document.querySelector("#list-tasks");
    listaDeTarefas.innerHTML = liContent;


}