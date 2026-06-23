const estudiantes = [
  {
    nombre: 'Maria',
    apellidos: 'Mora Perez',
    nota: 90
  },
  {
    nombre: 'Pedro',
    apellidos: 'Sibaja Lopez',
    nota: 60
  },
  {
    nombre: 'Marco',
    apellidos: 'Rojas Castro',
    nota: 78
  }
];

function renderizarTabla() {
  const tabla = document.getElementById('tabla-estudiantes');

  tabla.innerHTML = '';

  estudiantes.forEach(function(estudiante) {
    let claseNota = '';

    if (estudiante.nota >= 80) {
      claseNota = 'nota-alta';
    }

    if (estudiante.nota < 65) {
      claseNota = 'nota-baja';
    }

    tabla.innerHTML += `
      <tr>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.apellidos}</td>
        <td class="${claseNota}">
          ${estudiante.nota}
        </td>
      </tr>
    `;
  });
}

function validarFormulario() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const nota = document.getElementById('nota').value;
  const mensajeError = document.getElementById('mensaje-error');

  mensajeError.textContent = '';

  if (nombre === '' || apellidos === '' || nota === '') {
    mensajeError.textContent = 'Todos los campos son obligatorios.';
    return false;
  }

  if (nota < 0 || nota > 100) {
    mensajeError.textContent = 'La nota debe estar entre 0 y 100.';
    return false;
  }

  return true;
}

function agregarEstudiante() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const nota = parseFloat(document.getElementById('nota').value);

  const nuevoEstudiante = {
    nombre: nombre,
    apellidos: apellidos,
    nota: nota
  };

  estudiantes.push(nuevoEstudiante);

  renderizarTabla();
  actualizarResumen();

  document.getElementById('form-estudiante').reset();
}

function actualizarResumen() {
  let suma = 0;
  let mayor = estudiantes[0];
  let menor = estudiantes[0];

  estudiantes.forEach(function(estudiante) {
    suma += estudiante.nota;

    if (estudiante.nota > mayor.nota) {
      mayor = estudiante;
    }

    if (estudiante.nota < menor.nota) {
      menor = estudiante;
    }
  });

  const promedio = suma / estudiantes.length;

  document.getElementById('mayor-nota').textContent =
    `${mayor.nombre} ${mayor.apellidos} (${mayor.nota})`;

  document.getElementById('promedio-notas').textContent =
    promedio.toFixed(2);

  document.getElementById('menor-nota').textContent =
    `${menor.nombre} ${menor.apellidos} (${menor.nota})`;
}

document.addEventListener('DOMContentLoaded', function() {
  renderizarTabla();
  actualizarResumen();

  document
    .getElementById('form-estudiante')
    .addEventListener('submit', function(e) {
      e.preventDefault();

      if (validarFormulario()) {
        agregarEstudiante();
      }
    });
});