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
    for (let tarea of tareas){
        html += `<li class="item-tarea my-2 p-1 d-flex align-items-center text-${tarea.realizada ? "primary" : "primary-emphasis"}"> <input type="checkbox" ${tarea.realizada == true ? 'checked' : '' } onchange="validacionRealizadas(${tarea.id})" id="tarea${tarea.id}"> <span class="id">${tarea.id}</span> <span>- ${tarea.nombreTarea}</span> <button onclick="borrar(${tarea.id})" class="btn btn-danger btn-eliminar bg-${tarea.realizada ? "opacity-1" : "opacity-05"}"">Eliminar</button></li>`
    }
    listaTareas.innerHTML = html;
    totalTareas.innerHTML = tareas.length //contabiliza cantidad de tareas
    
    const realizadas = tareas.filter(elemento => elemento.realizada).length;
    completadas.innerHTML = realizadas;
    console.log(tareas)
    
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

renderTareas()

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
        nombreTarea: tareaInput.value
    }
    tareas.push(nuevaTarea);
    tareaInput.value = '';

    renderTareas()
});

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


    

    
