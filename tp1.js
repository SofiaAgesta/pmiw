// https://youtu.be/41MufmB23r8
//

let imagenElegida;
let modoInteractivo = false;
let cantidadColumnas = 10;
let cantidadFilas = 10;
let espacioEntreCirculos = 40;

function preload() {
  imagenElegida = loadImage("data/F_37.jpg");
}

function setup() {
createCanvas(800, 400);
}

function draw() {
background(255);
image(imagenElegida, 0, 0, 400, 400);
  for (let columna = 0; columna < cantidadColumnas; columna++) {
    for (let fila = 0; fila < cantidadFilas; fila++) {
      let x = 400 + columna * espacioEntreCirculos + espacioEntreCirculos / 2;
      let y = fila * espacioEntreCirculos + espacioEntreCirculos / 2;
      let grosor = calcularGrosor(x, y, columna, fila);
      dibujarCirculo(x, y, espacioEntreCirculos * 0.9, grosor);
    }
  }
}

function calcularGrosor(x, y, columna, fila) {
  let grosor;
  if (modoInteractivo) {
  let distancia = dist(mouseX, mouseY, x, y);
    grosor = map(distancia, 0, width / 2, espacioEntreCirculos * 0.4, 5);
    grosor = constrain(grosor, 5, espacioEntreCirculos * 0.4);
  } else {
    grosor = map(columna + fila, 0, cantidadColumnas + cantidadFilas - 2, 5, espacioEntreCirculos * 0.4);
  }
  return grosor;
}

function dibujarCirculo(x, y, diametroExterior, grosor) {
  noStroke();
  fill(0);
  ellipse(x, y, diametroExterior);
  fill(255);
  ellipse(x, y, diametroExterior - grosor);
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    modoInteractivo = true;
  } else if (key === 'r' || key === 'R') {
    modoInteractivo = false;
  }
}
