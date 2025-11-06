const API_URL = "http://localhost:3000/cursos"; 

const form = document.getElementById("formCurso"); 

const tabla = document.querySelector("#tablaCursos tbody"); 

const idInput = document.getElementById("id"); 

const nombreInput = document.getElementById("nombre"); 

const duracionInput = document.getElementById("duracion"); 

const instructorInput = document.getElementById("instructor"); 

const btnGuardar = document.getElementById("btnGuardar"); 

const btnCancelar = document.getElementById("btnCancelar"); 

 

// ====== Cargar cursos ====== 

async function cargarCursos() { 

  const res = await fetch(API_URL); 

  const cursos = await res.json(); 

  tabla.innerHTML = ""; 

  cursos.forEach(c => { 

    tabla.innerHTML += ` 

      <tr> 

        <td>${c.id}</td> 

        <td>${c.nombre}</td> 

        <td>${c.duracion}</td> 

        <td>${c.instructor}</td> 

        <td> 

          <button class="btn btn-warning btn-sm" onclick="editarCurso(${c.id}, '${c.nombre}', ${c.duracion}, '${c.instructor}')">Editar</button> 

          <button class="btn btn-danger btn-sm" onclick="eliminarCurso(${c.id})">Eliminar</button> 

        </td> 

      </tr> 

    `; 

  }); 

} 

 

// ====== Crear o actualizar ====== 

form.addEventListener("submit", async e => { 

  e.preventDefault(); 

  const id = idInput.value; 

  const datos = { 

    nombre: nombreInput.value, 

    duracion: duracionInput.value, 

    instructor: instructorInput.value 

  }; 

 

  if (id) { 

    await fetch(`${API_URL}/${id}`, { 

      method: "PUT", 

      headers: { "Content-Type": "application/json" }, 

      body: JSON.stringify(datos) 

    }); 

  } else { 

    await fetch(API_URL, { 

      method: "POST", 

      headers: { "Content-Type": "application/json" }, 

      body: JSON.stringify(datos) 

    }); 

  } 

 

  form.reset(); 

  idInput.value = ""; 

  btnGuardar.textContent = "Guardar"; 

  btnCancelar.style.display = "none"; 

  cargarCursos(); 

}); 

 

// ====== Editar ====== 

function editarCurso(id, nombre, duracion, instructor) { 

  idInput.value = id; 

  nombreInput.value = nombre; 

  duracionInput.value = duracion; 

  instructorInput.value = instructor; 

  btnGuardar.textContent = "Actualizar"; 

  btnCancelar.style.display = "inline-block"; 

} 

 

// ====== Cancelar edición ====== 

btnCancelar.addEventListener("click", () => { 

  form.reset(); 

  idInput.value = ""; 

  btnGuardar.textContent = "Guardar"; 

  btnCancelar.style.display = "none"; 

}); 

 

// ====== Eliminar ====== 

async function eliminarCurso(id) { 

  if (confirm("¿Seguro que deseas eliminar este curso?")) { 

    await fetch(`${API_URL}/${id}`, { method: "DELETE" }); 

    cargarCursos(); 

  } 

} 

 

// ====== Inicializar ====== 

cargarCursos(); 