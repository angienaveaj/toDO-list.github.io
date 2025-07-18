const btnAgregar = document.querySelector('#boton')
const btnEditar = document.querySelectorAll('.btn-editar')
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
        <li class="item-tarea tema-${temaActual} row py-2 my-1" id="tarea-${tarea.id}">
            <div class="d-flex align-items-center gap-2 col-md-11">
            <input type="checkbox" ${checked} onchange="validacionRealizadas(${tarea.id})" class="checkbox-tarea tema-${temaActual}" data-toggle="tooltip" data-placement="top" title="Marcar como completada">
            <span class="id ${estiloTexto}">${tarea.id}</span>`;

        //Mostrar INPUT EDITAR  input si la tarea está en modo edición
        if (tarea.editando) {
            html += `<input type="text" id="editar-${tarea.id}" value="${tarea.nombreTarea}" class="form-control">`
        } else {
            html += `<span class="la-tarea ${estiloTexto}">${tarea.nombreTarea}</span>`;
        }

        html += `</div>
        <div class="d-flex gap-2 justify-content-end col-md-1 mt-1">
            <button onClick="editarTarea(${tarea.id})" class="btn btn-outline-primary btn-editar"> ${tarea.editando ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-regular fa-pen-to-square"></i>'}</button>
            <button onclick="borrar(${tarea.id})" class="btn btn-danger btn-eliminar bg-${tarea.realizada ? "opacity-1" : "opacity-05"}"><i class="fa-regular fa-trash-can"></i></button>
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
    const li = document.getElementById(`tarea-${id}`); //busca el <li> con su ID
    li.classList.add('eliminando'); //añade class

    setTimeout(() => {
        //eliminar tarea del array tareas usando splice despues de la animacion
        const index = tareas.findIndex((ele) => ele.id == id);
        tareas.splice(index, 1); 

        renderTareas(); //despues de la animacion llamamos a render tareas
    }, 500); //tiempo igual de la animacion
}

console.log(borrar)

//EDITAR TAREA
function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    
    // Si ya estaba en modo edición, guardamos el nuevo nombre
    if (tarea.editando) {
        const input = document.querySelector(`#editar-${id}`);
        tarea.nombreTarea = input.value.trim();
    }

    // Alternamos el modo edición
    tarea.editando = !tarea.editando;

    renderTareas();

    // Si ahora está en modo edición, agregamos el listener
    if (tarea.editando) {
        const input = document.querySelector(`#editar-${id}`);

        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    editarTarea(id); // volver a llamar para guardar
                }
            });
            input.focus(); // opcional: enfoca el input automáticamente
        } 
    }
}




///////Editar TEMAS COLORES ////////
const selectTema = document.getElementById('selectTema');
const contenedor = document.querySelector('.contenedor');
const inputTarea = document.querySelector('.input-tarea');
const btnInput = document.querySelector('.btn-input')

//Aplica el tema desde localStorage
document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema') || 'claro';
    
    document.body.className = `tema-${temaGuardado}`;

    contenedor.classList.add(`tema-${temaGuardado}`);

    selectTema.classList.add(`tema-${temaGuardado}`);

    inputTarea.classList.add(`tema-${temaGuardado}`);

    btnInput.classList.add(`tema-${temaGuardado}`);
    //Contenedor de cada budge
    const contenedorBudge = document.querySelectorAll('.contenedor-budge');
    contenedorBudge.forEach(cont => {
        cont.classList.add(`tema-${temaGuardado}`);
    });
        selectTema.value = temaGuardado;
    //contenedor item tarea
    const elementos = document.querySelectorAll('.item-tarea');
    elementos.forEach(el => {
        el.classList.add(`tema-${temaGuardado}`);
    });
        selectTema.value = temaGuardado;
    //
    const checkboxs = document.querySelectorAll('.checkbox-tarea');
    checkboxs.forEach(ch => {
    ch.classList.add(`tema-${temaGuardado}`);
    });
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
    //cambia color budge
    document.querySelectorAll('.contenedor-budge').forEach(cont => {
        cont.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`)
    });
    //cambia items
    document.querySelectorAll('.item-tarea').forEach(el => {
        el.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`)
    });
    //cambia select
    selectTema.classList.replace(`tema-${temaAnterior}`, `tema-${nuevoTema}`);
    //cambia checkboxs
    document.querySelectorAll('.checkbox-tarea').forEach(ch => {
    ch.classList.remove(`tema-${temaAnterior}`);
    ch.classList.add(`tema-${nuevoTema}`);
});
    localStorage.setItem('tema', nuevoTema);
});
