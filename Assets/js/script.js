const btnAgregar = document.querySelector('#boton')
const tareaInput = document.querySelector('#input')
const listaTareas = document.querySelector('ul')
const totalTareas = document.querySelector('#total')
const completadas = document.querySelector('#completadas')

const guardar = JSON.parse(localStorage.getItem('tareas'));

const tareas = guardar || [
    {id: 444, nombreTarea: 'Estudiar JS', realizada: true},
    {id: 445, nombreTarea: 'Hacer desafío arreglos', realizada: true},
    {id: 446, nombreTarea: 'Enviar desafio', realizada: false},
];

//Mostramos tareas en el DOM
function renderTareas() {
    let html = ''

    for (let tarea of tareas) {
        const checked = tarea.realizada ? 'checked' : '';
        const estiloTexto = tarea.realizada ? 'text-primary' : 'text-primary-emphasis';
        const opacidad = tarea.realizada ? 'opacity-1' : 'opacity-05';

        html += `
        <li class="item-tarea my-2 p-1 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
            <input type="checkbox" ${checked} onchange="validacionRealizadas(${tarea.id})">
            <span class="id ${estiloTexto}">${tarea.id}</span>`;

        if (tarea.editando) {
            html += `<input type="text" id="editar-${tarea.id}" value="${tarea.nombreTarea}" class="form-control">`
        } else {
            html += `<span class="la-tarea ${estiloTexto}">${tarea.nombreTarea}</span>`;
        }

        html += `</div>
        <div class="d-flex gap-2 justify-content-between">
            <button onClick="editarTarea(${tarea.id})" class="btn btn-outline-primary"> ${tarea.editando ? 'Guardar' : 'Editar'}</button>
            <button onclick="borrar(${tarea.id})" class="btn btn-danger btn-eliminar bg-${tarea.realizada ? "opacity-1" : "opacity-05"}">Eliminar</button>
        </div>
        </li>`;
    }

    listaTareas.innerHTML = html;
    totalTareas.innerHTML = tareas.length;
    completadas.innerHTML = tareas.filter(t => t.realizada).length;
    
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

//renderTareas()

btnAgregar.addEventListener('click', () => {
    //valida q input tenga contenido
    const espacio = tareaInput.value.trim();
    console.log(espacio)
    if (espacio === ''){
        alert('Debes escribir una tarea para agregar')
        return //retorna funcion normalmente
    }

    let id = Math.floor(Math.random()*999)

    let nuevaTarea = {
        id: id,
        nombreTarea: tareaInput.value.trim(), //
        realizada: false, //
        editando: false //
    }
    tareas.push(nuevaTarea);
    tareaInput.value = '';

    renderTareas()
});

//tomar al enter
tareaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        btnAgregar.click();
    }
})

renderTareas()

console.log(tareas)

function borrar(id) {
    const index = tareas.findIndex((ele) => ele.id == id)
    tareas.splice(index, 1)

    renderTareas()
}

console.log(borrar)

//Validar completadas
function validacionRealizadas(id){
    const tarea = tareas.find(elemento => elemento.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada;
        renderTareas();
    }
}

function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    
    if (tarea.editando) {
        const input = document.querySelector(`#editar-${id}`);
        tarea.nombreTarea = input.value.trim();
    }

    tarea.editando = !tarea.editando;
    renderTareas();
}

    

    
