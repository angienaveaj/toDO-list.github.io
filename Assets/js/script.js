const btnAgregar = document.querySelector('#boton')
const tareaInput = document.querySelector('#input')
const listaTareas = document.querySelector('ul')
const totalTareas = document.querySelector('#total')
const completadas = document.querySelector('#completadas')

const guardar = JSON.parse(localStorage.getItem('tareas'));

const tareas = guardar || [
    {id: 444, nombreTarea: 'Esta es solo una tarea de ejemplo, puede borrarla', realizada: false},
];

//Mostramos tareas en el DOM
function renderTareas() {
    let html = ''
    //tomamos array tareas
    for (let tarea of tareas) {
        // Si tarea.realizada es true, entonces checkbox debe estar marcado checked
        const checked = tarea.realizada ? 'checked' : '';
        // ${tarea.realizada ? 'checked' : ''} es un OPERARDOR TERNARIO QUE EQUIVALE A:
                                                /*if (tarea.realizada) {
                                                return 'checked';
                                                } else {
                                                return '';
                                                }*/
        const estiloTexto = tarea.realizada ? 'text-opacity' : 'text-primary-emphasis';
        const opacidad = tarea.realizada ? 'opacity-1' : 'opacity-05';

        //creamos un bloque HTML
        const temaActual = localStorage.getItem('tema') || 'claro';
        html += ` 
        <li class="item-tarea tema-${temaActual} row py-2 my-1">
            <div class="d-flex align-items-center gap-2 col-md-10">
            <input type="checkbox" ${checked} onchange="validacionRealizadas(${tarea.id})" class="checkbox-tarea">
            <span class="id ${estiloTexto}">${tarea.id}</span>`;

        //Mostra input si la tarea está en modo edición
        if (tarea.editando) {
            html += `<input type="text" id="editar-${tarea.id}" value="${tarea.nombreTarea}" class="form-control">`
        } else {
            html += `<span class="la-tarea ${estiloTexto}">${tarea.nombreTarea}</span>`;
        }

        html += `</div>
        <div class="d-flex gap-2 justify-content-evenly col-md-2 mt-1">
            <button onClick="editarTarea(${tarea.id})" class="btn btn-outline-primary w-100"> ${tarea.editando ? 'Guardar' : 'Editar'}</button>
            <button onclick="borrar(${tarea.id})" class="btn btn-danger btn-eliminar w-100 bg-${tarea.realizada ? "opacity-1" : "opacity-05"}">Eliminar</button>
        </div>
        </li>`;
    }

    listaTareas.innerHTML = html; //muestra lista en pantalla en el ODM
    totalTareas.innerHTML = tareas.length;
    completadas.innerHTML = tareas.filter(t => t.realizada).length;
    
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

//renderTareas()

//VALIDAR TAREA COMPLETADA
function validacionRealizadas(id){
    const tarea = tareas.find(elemento => elemento.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada;
        renderTareas();
    }
}

//AGREGAR TAREA
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
        realizada: false, //estado inicial de false
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

//BORRAR TAREA
function borrar(id) {
    const index = tareas.findIndex((ele) => ele.id == id)
    tareas.splice(index, 1)

    renderTareas()
}

console.log(borrar)

//EDITAR TAREA
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

//Editar temas
const selectTema = document.getElementById('tema');
const contenedor = document.querySelector('.contenedor');
const inputTarea = document.querySelector('.input-tarea');
const btnInput = document.querySelector('.btn-input')

//Aplica el tema desde localStorage
document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema') || 'claro';
    
    document.body.className = `tema-${temaGuardado}`;

    contenedor.classList.add(`tema-${temaGuardado}`);

    inputTarea.classList.add(`tema-${temaGuardado}`);

    btnInput.classList.add(`tema-${temaGuardado}`);
    //Contenedor de cada item tarea
    const elementos = document.querySelectorAll('.item-tarea');
    elementos.forEach(el => {
        el.classList.add(`tema-${temaGuardado}`);
    });
        //selectTema.value = temaGuardado;
    //
    const checkboxs = document.querySelectorAll('.checkbox-tarea');
    checkboxs.forEach(ch => {
        ch.classList.add(`tema-${temaGuardado}`);
    });
        selectTema.value = temaGuardado;
    });

//Cambia el tema cuando el usuario selecciona
selectTema.addEventListener('change', () => {
    const temaAnterior = localStorage.getItem('tema') || 'claro';
    const nuevoTema = selectTema.value;
    //cambia el body
    document.body.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`);
    //acmbia contenedor
    contenedor.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`);
    //
    inputTarea.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`);
    //
    btnInput.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`);
    //cambia items
    document.querySelectorAll('.item-tarea').forEach(el => {
        el.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`)
    });
    //cambia checkboxs
    document.querySelectorAll('.checkbox-tarea').forEach(ch => {
        ch.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`)
    });
    localStorage.setItem('tema', nuevoTema);
});
