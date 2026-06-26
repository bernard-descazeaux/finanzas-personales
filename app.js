// Aquí guardamos todos los gastos
let gastos = [];

// Esto se ejecuta cuando aprietas el botón "Agregar"
document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault(); // evita que la página se recargue

  // Leemos lo que escribiste en el formulario
  const descripcion = document.getElementById('descripcion').value;
  const monto = document.getElementById('monto').value;
  const categoria = document.getElementById('categoria').value;

  // Creamos un objeto con ese gasto
    const gasto = {
    descripcion: descripcion,
    monto: '$' + Number(monto).toLocaleString('es-CL'),
    categoria: categoria,
    fecha: new Date().toLocaleDateString('es-CL')
  };

  // Lo agregamos a la lista
  gastos.push(gasto);

  // Enviamos a Google Sheets
  enviarASheets(gasto);

  // Actualizamos lo que se ve en pantalla
  mostrarGastos();

  // Limpiamos el formulario
  document.getElementById('formulario').reset();
});

// Esta función dibuja los gastos en pantalla
function mostrarGastos() {
  const lista = document.getElementById('lista');
  lista.innerHTML = ''; // borramos lo anterior

  gastos.forEach(function(gasto) {
    const montoFormateado = Number(gasto.monto).toLocaleString('es-CL');
    const item = document.createElement('li');
    item.textContent = gasto.fecha + ' — ' + gasto.categoria + ' — ' + gasto.descripcion + ': $' + montoFormateado;
    lista.appendChild(item);
  });
}

// Envía el gasto a Google Sheets
function enviarASheets(gasto) {
  const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbza7KLm7cCxSd__IT_s1r6olLBIq0-7jJdtIasOUVrGcAXn49Wv2e_fIsa0dLXrR0pfhg/exec';

  fetch(URL_SCRIPT, {
    method: 'POST',
    body: JSON.stringify(gasto)
  });
}