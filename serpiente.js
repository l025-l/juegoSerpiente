
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;
const serpiente = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 8, y: 11 }
];

let intervaloSerpiente; 
let direccionActual = "derecha";
let comida = { x: 5, y: 5 };


// Primera pintura del juego al cargar la página
generarComida();
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

function dibujarTablero() {
  ctx.strokeStyle = "#3a4c65";
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY, colorRelleno) {
  let posicionRealX = lineaX * TAMANIO_CELDA;
  let posicionRealY = lineaY * TAMANIO_CELDA;
  ctx.fillStyle = colorRelleno;
  ctx.fillRect(posicionRealX, posicionRealY, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "#ffff";
  ctx.strokeRect(posicionRealX, posicionRealY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    let color = (i === 0) ? "#facc15" : "#ef4444";
    pintarParte(serpiente[i].x, serpiente[i].y, color);
  }
}

function cambiarDireccion(nuevaDireccion) {
  direccionActual = nuevaDireccion;
}

function moverDerecha() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x + 1, y: cabezaActual.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x - 1, y: cabezaActual.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y - 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y + 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function iniciarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = setInterval(moverSerpiente, 500);
  document.getElementById("estado").innerText = "Jugando";
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").innerText = "Pausado";
}

function moverSerpiente() {
  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }
  if (atrapaComida() === true) {
    let etiquetaPuntaje = document.getElementById("puntaje");
    let puntosActuales = parseInt(etiquetaPuntaje.innerText);
    etiquetaPuntaje.innerText = puntosActuales + 10;
    let ultimaParte = serpiente[serpiente.length - 1];
    serpiente.push({ x: ultimaParte.x, y: ultimaParte.y });  
    generarComida();
  }  
  dibujarTodo();
}

function generarComida() {
  let maxCol = canvas.width / TAMANIO_CELDA;
  let maxFil = canvas.height / TAMANIO_CELDA;
  comida.x = Math.floor(Math.random() * maxCol);
  comida.y = Math.floor(Math.random() * maxFil);
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "#22c55e"); 
}

function atrapaComida() {
  let cabeza = serpiente[0];
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  } else {
    return false;
  }
}