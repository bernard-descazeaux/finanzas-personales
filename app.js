// Aquí guardamos todos los gastos
let gastos = [];

// Limpia emojis antes de enviar a Sheets
function limpiarEmoji(texto) {
  return texto.replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

// Esto se ejecuta cuando aprietas el botón "Agregar"
document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();

  const descripcion = document.getElementById('descripcion').value;
  const monto = document.getElementById('monto').value;
  const categoria = document.getElementById('categoria').value;

  const gasto = {
    descripcion: descripcion,
    monto: Number(monto),
    categoria: categoria,
    categoriaSheets: limpiarEmoji(categoria),
    fecha: new Date().toLocaleDateString('es-CL')
  };

  gastos.push(gasto);
  enviarASheets(gasto);
  mostrarGastos();
  document.getElementById('formulario').reset();
});

// Esta función dibuja los gastos en pantalla
function mostrarGastos() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

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

  const hoy = new Date();
  const inicioAno = new Date(hoy.getFullYear(), 0, 1);
  const semana = Math.ceil(((hoy - inicioAno) / 86400000 + inicioAno.getDay() + 1) / 7);

  fetch(URL_SCRIPT, {
    method: 'POST',
    body: JSON.stringify({
      fecha: gasto.fecha,
      semana: semana,
      descripcion: gasto.descripcion,
      categoria: gasto.categoriaSheets,
      monto: gasto.monto
    })
  });
}